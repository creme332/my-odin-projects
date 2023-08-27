import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  console.log(currentUserID);

  function isUserSignedIn() {
    return currentUser ? true : false;
  }

  async function createNewAccount(email, password) {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }

  return { createNewAccount, isUserSignedIn };
}
