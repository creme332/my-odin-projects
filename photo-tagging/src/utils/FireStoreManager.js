import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  runTransaction,
  where,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { getFirebaseConfig } from "../firebase-config";

export default function FireStoreManager() {
  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const currentUser = getAuth().currentUser;
  const currentUserID = currentUser ? currentUser.uid : null;
  const usersCollectionRef = collection(db, "users"); // user data
  const gamesCollectionRef = collection(db, "games"); // game data

  /**
   * Creates a new document in `users` collection for a new user.
   * User must be signed-in.
   */
  async function createNewUser() {
    await setDoc(doc(usersCollectionRef, currentUserID), {
      displayName: currentUser.displayName,
      id: currentUserID,
      joinDate: serverTimestamp(), // when was user account created
      gamesStarted: 0, // number of times play button is clicked but game is not necessarily completed
      gamesCompleted: 0, // number of times all characters are found for a map
      totalPlayTime: 0, // minutes
    });
  }

  /**
   * Returns game data for currently-signed in user.
   * @param {Number} docLimit Number of documents to fetch.
   * @returns {[Game]} A list of `game` objects
   */
  async function getGameDataForUser(docLimit = 100) {
    if (!currentUser) return null;

    const q = query(
      gamesCollectionRef,
      where("userID", "==", currentUserID),
      orderBy("date", "desc"),
      limit(docLimit)
    );

    const gameData = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      console.log("Successfully fetched game data for user");
      return gameData;
    } catch (e) {
      console.log("Failed to fetch game data of user", e);
    }
    return null;
  }

  /**
   * Returns game data for a particular map.
   * @param {String} mapTitle map ID is same as map title
   * @param {Number} docLimit Number of documents to fetch.
   * @returns {[Game]} A list of `game` objects
   */
  async function getGameDataForMap(mapTitle, docLimit = 20) {
    const q = query(
      gamesCollectionRef,
      where("mapID", "==", mapTitle),
      orderBy("duration", "asc"),
      limit(docLimit)
    );

    const gameData = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        gameData.push(doc.data());
      });
      console.log(`Successfully fetched all game data for ${mapTitle}`);
      return gameData;
    } catch (e) {
      console.log(`Failed to fetch game data for ${mapTitle}`);
    }
  }

  /**
   * Saves game data for currently signed in user.
   * @param {Number} mapID map title
   * @param {Number} duration game duration in seconds
   * @param {[String]} characterList list of character IDs present in game
   * @param {Number} helpCount Number of times `help` button was pressed
   * @param {Number} score score received
   */
  async function addGameData(mapID, duration, characterList, helpCount, score) {
    if (currentUser) {
      await addDoc(gamesCollectionRef, {
        userID: currentUserID,
        mapID: mapID,
        date: serverTimestamp(), //when was game played
        duration: duration, // how long game lasted in seconds
        chraracterList: characterList, // characters found by player
        helpCount: helpCount, // how many times player used help option
        score: score, // game score
      });
      console.log("Added new game data");
    }
  }

  /**
   * Call this function when game ends. It will save required information to database and update user statistics.
   * @param {Number} mapID map title
   * @param {Number} duration game duration in seconds
   * @param {[String]} characterList list of character IDs present in game
   * @param {Number} helpCount Number of times `help` button was pressed
   * @param {Number} score score received
   */
  async function handleEndOfGame(
    mapID,
    duration,
    characterList,
    helpCount,
    score
  ) {
    if (currentUser) {
      await addGameData(mapID, duration, characterList, helpCount, score);
      await updateUserStats(duration);
    }
  }

  /**
   * Returns the display name of a user.
   * @param {Boolean} forCurrentUser Set to true to fetch username of currently signed in user
   * @param {String} anotherUserID ID of some user
   * @returns {String}
   */
  async function getUsername(forCurrentUser = true, anotherUserID = null) {
    if (forCurrentUser) {
      if (currentUser) {
        const x = await getUserData();
        return x.displayName;
      }
    } else {
      const docRef = doc(usersCollectionRef, anotherUserID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().displayName;
      } else {
        console.log(`No document for user with id ${anotherUserID}`);
      }
    }
  }

  /**
   * Returns photo URL of currently signed-in user.
   * @returns {String}
   */
  function getPhotoURL() {
    if (currentUser) return currentUser.photoURL;
  }

  /**
   * Returns user data for currently-signed in user.
   * @returns {User} A `user` object
   */
  async function getUserData() {
    if (currentUser) {
      console.log("Requested data for current user");
      const docRef = doc(usersCollectionRef, currentUserID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // data for signed-in user already exists in database
        console.log("Found user data!");
        return docSnap.data();
      } else {
        // signed-in user is a newcomer so no data available
        console.log("Signed-in user is a newcomer!");
        return [];
      }
    }
    console.log("No user is currently signed-in");

    return null;
  }

  /**
   * Call this function after game ends. It will update `gamesCompleted` and `totalPlayTime` for currently signed-in user.
   * @param {Number} gameDuration How long game lasted in seconds
   */
  async function updateUserStats(gameDuration) {
    if (currentUser) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, currentUserID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw new Error("Document does not exist!");
          }
          const userData = userDoc.data();

          transaction.update(docRef, {
            gamesCompleted: userData.gamesCompleted + 1,
            totalPlayTime: userData.totalPlayTime + gameDuration,
          });
        });
        console.log("User game data transaction successfully committed!");
      } catch (e) {
        console.log("User game data Transaction failed: ", e);
      }
    }
  }

  /**
   * Call this function when game starts. It will update `gamesStarted` for currently signed-in user.
   */
  async function incrementGamesStarted() {
    if (currentUser) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, currentUserID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw new Error("Document does not exist!");
          }

          const newTotal = userDoc.data().gamesStarted + 1;
          transaction.update(docRef, { gamesStarted: newTotal });
        });
        console.log("Game start transaction successfully committed!");
      } catch (e) {
        console.log("Game start transaction failed: ", e);
      }
    }
  }

  /**
   * Updates display name for currently signed-in user
   * @param {String} newName new display name of user
   */
  async function updateDisplayName(newName) {
    if (currentUser) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, currentUserID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw new Error("Document does not exist!");
          }
          transaction.update(docRef, { displayName: newName });
        });
        console.log("Display name successfully updated!");
      } catch (e) {
        console.log("Display name transaction failed: ", e);
      }
    }
  }

  return {
    createNewUser,
    getUserData,
    incrementGamesStarted,
    getUsername,
    getPhotoURL,
    updateDisplayName,
    handleEndOfGame,
    getGameDataForUser,
    getGameDataForMap,
  };
}
