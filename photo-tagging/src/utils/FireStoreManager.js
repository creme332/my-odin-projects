import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
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
  const usersRef = collection(db, "users");

  /**
   * Creates a document for a new user
   * @param {Firestore.User} Firestore user object
   */
  async function createNewUser() {
    await setDoc(doc(usersRef, userID), {
      name: user.displayName,
      country: "Global",
      id: userID,
      joinDate: serverTimestamp(), // when was user account created
      gamesStarted: 0, // number of times play button is clicked but game is not necessarily completed
      gamesCompleted: 0, // number of times all characters are found for a map
      totalPlayTime: 0, // minutes
    });
  }

  function getUsername() {
    return user.displayName;
  }

  /**
   * Returns user data
   * @returns {User} A user object
   */
  async function getUserData() {
    if (user) {
      const docRef = doc(usersRef, userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data();
    }
    return null;
  }

  async function incrementGamesStarted() {
    if (user) {
      try {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(usersRef, userID);
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
          const docRef = doc(usersRef, userID);
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
          const docRef = doc(usersRef, userID);
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

  return {
    createNewUser,
    getUserData,
    incrementGamesStarted,
    incrementPlayTime,
    incrementGamesCompleted,
    getUsername,
  };
}
