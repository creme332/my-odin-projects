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
   * @param {Firestore.User} Firestore user object
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
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }
  }

  async function incrementGamesCompleted() {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, userID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw "Document does not exist!";
          }

          const newTotal = userDoc.data().gamesCompleted + 1;
          transaction.update(docRef, { gamesCompleted: newTotal });
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }
  }

  async function incrementPlayTime(value = 0) {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersCollectionRef, userID);
          const userDoc = await transaction.get(docRef);
          if (!userDoc.exists()) {
            throw "Document does not exist!";
          }

          const newTotal = userDoc.data().totalPlayTime + value;
          transaction.update(docRef, { totalPlayTime: newTotal });
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
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
        console.log("Transaction failed: ", e);
      }
    }
  }

  return {
    createNewUser,
    getUserData,
    incrementGamesStarted,
    incrementPlayTime,
    incrementGamesCompleted,
    getUsername,
    getPhotoURL,
    updateDisplayName,
    addGameData,
  };
}
