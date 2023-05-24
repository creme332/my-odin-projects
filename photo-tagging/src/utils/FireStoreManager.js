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
  const user = getAuth().currentUser;
  const userID = user ? user.uid : null;
  const usersCollectionRef = collection(db, "users"); // user data
  const gamesCollectionRef = collection(db, "games"); // game data

  /**
   * Creates a document for a new user
   * @param {Firestore User} Firestore user object
   */
  async function createNewUser() {
    await setDoc(doc(usersCollectionRef, userID), {
      name: user.displayName,
      country: "Global",
      id: userID,
      joinDate: serverTimestamp(), // when was user account created
      gamesStarted: 0, // number of times play button is clicked but game is not necessarily completed
      gamesCompleted: 0, // number of times all characters are found for a map
      totalPlayTime: 0, // minutes
    });
  }

  async function getGameDataForUser(docLimit = 100) {
    if (!user) return null;

    const q = query(
      gamesCollectionRef,
      where("userID", "==", userID),
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
  }

  async function addGameData(mapID, duration, characterList, helpCount, score) {
    if (user) {
      await addDoc(gamesCollectionRef, {
        userID: userID,
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

  async function handleEndOfGame(
    mapID,
    duration,
    characterList,
    helpCount,
    score
  ) {
    if (user) {
      await addGameData(mapID, duration, characterList, helpCount, score);
      await updateUserStats(duration);
    }
  }

  async function getUsername() {
    if (user) {
      const x = await getUserData();
      return x.displayName;
    }
  }

  function getPhotoURL() {
    return user.photoURL;
  }

  /**
   * Returns user data
   * @returns {User} A user object
   */
  async function getUserData() {
    if (user) {
      console.log("Requested data for user");
      const docRef = doc(usersCollectionRef, userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data();
    }
    console.log("No data for user");

    return null;
  }

  async function updateUserStats(gameDuration) {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, userID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw "Document does not exist!";
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

  async function incrementGamesStarted() {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, userID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw "Document does not exist!";
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

  async function updateDisplayName(newName) {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, userID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw "Document does not exist!";
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
  };
}
