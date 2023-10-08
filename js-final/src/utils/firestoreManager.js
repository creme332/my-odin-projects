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
  where,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getFirebaseConfig } from "../firebase-config";

export default function FireStoreManager() {
  const app = initializeApp(getFirebaseConfig());
  const db = getFirestore(app);
  const currentUser = getAuth().currentUser;
  console.log("Current user: ", currentUser ? currentUser.email : null);

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

  async function signIn(email, password) {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log("Successfully signed in as", getAuth().currentUser.email);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }

  function signOut() {
    getAuth().signOut();
  }

  async function createHabit(newHabit) {
    const email = await currentUser.email;
    const habitCollection = collection(db, "users", email, "habits");
    const docRef = await addDoc(habitCollection, newHabit);
    console.log("Created habit document ", docRef.id);
  }

  async function updateHabit(habit) {
    const email = await currentUser.email;
    const habitCollection = collection(db, `users/${email}/habits`); // get habit collection for that user
    const q = query(habitCollection, where("id", "==", habit.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(habitCollection, docSnapshot.id);
      setDoc(docRef, habit);
      console.log("Updated habit document ", docSnapshot.id);
    });
  }

  async function deleteHabit(habitID) {
    const email = await currentUser.email;
    const habitCollection = collection(db, `users/${email}/habits`); // get habit collection for current user
    const q = query(habitCollection, where("id", "==", habitID)); // save reference to document to be deleted

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      console.log(docSnapshot.id, " => ", docSnapshot.data());
      deleteDoc(doc(habitCollection, docSnapshot.id));
      console.log("Deleted habit document ", docSnapshot.id);
    });
  }

  async function getAllHabits() {
    const user = await currentUser;
    if (!user) return [];
    const email = user.email;
    const habitCollection = collection(db, `users/${email}/habits`); // get habit collection for current user
    const querySnapshot = await getDocs(habitCollection);

    const habits = [];
    querySnapshot.forEach((docSnapshot) => {
      habits.push(docSnapshot.data());
    });
    return habits;
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
    validateLogin,
    signIn,
    signOut,
    createHabit,
    deleteHabit,
    updateHabit,
    getAllHabits,
  };
}
