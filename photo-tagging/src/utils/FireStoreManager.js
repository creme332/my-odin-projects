import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseConfig } from "../firebase-config";

export default function FireStoreManager() {
  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const usersRef = collection(db, "users");

  /**
   * Creates a document for a new user
   * @param {Firestore.User} Firestore user object
   */
  async function createUser(user) {
    await setDoc(doc(usersRef, user.uid), {
      name: user.displayName,
      country: "Global",
      id: user.uid,
      joinDate: serverTimestamp(), // when was user account created
      gamesStarted: 0, // number of times play button is clicked but game is not necessarily completed
      gamesCompleted: 0, // number of times all characters are found for a map
      totalPlayTime: 0, // minutes
    });
  }

  /**
   * Returns user data
   * @param {*} userID
   * @returns {User} A user object
   */
  async function getUserData(userID) {
    const docRef = doc(usersRef, userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
    console.log("No such document!");
    return null;
  }
  return { createUser, getUserData };
}
