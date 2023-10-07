import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
import getHabits from "@/habit";

export default function FireStoreManager() {
  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const currentUser = getAuth().currentUser;
  const currentUserID = currentUser ? currentUser.uid : null;
  console.log("Currently logged in user: ", currentUserID);

  function isUserSignedIn() {
    return currentUser ? true : false;
  }

  async function createNewAccount(email, password) {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await createNewUserDoc(email, password);
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
    return false;
  }

  async function validateLogin(email, password) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().password === password;
    } else {
      return false;
    }
  }

  function signIn(email, password) {
    signInWithEmailAndPassword(getAuth(), email, password);
  }

  function signOut() {
    getAuth().signOut();
  }

  async function addNewHabit(email, newHabit = getHabits()[0]) {
    const habitCollection = collection(db, "users", email, "habit");
    const docRef = await addDoc(habitCollection, newHabit);
    console.log("Document written with ID: ", docRef.id);
  }

  async function createNewUserDoc(email, password) {
    console.log(`Creating a new user document for ${email}`);
    const userDocRef = doc(db, "users", email);

    try {
      await setDoc(
        userDocRef,
        {
          email: email,
          password: password,
          dateJoined: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
    console.log("Done");
  }

  return {
    createNewAccount,
    isUserSignedIn,
    addNewHabit,
    validateLogin,
    signIn,
    signOut,
  };
}
