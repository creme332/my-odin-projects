import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
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

  /**
   * Checks if a there is a user signed in currently
   * @returns {Boolean}
   */
  function isUserSignedIn() {
    return currentUser ? true : false;
  }

  /**
   * Creates a new user account with given email and password
   * @param {string} email
   * @param {string} password
   * @returns {boolean} `True` if account creation is successful
   */
  async function createNewAccount(email, password) {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await createNewUserDoc(email, password);
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  /**
   * Signs in to an account. Returns true if sign in successful.
   * @param {String} email
   * @param {String} password
   */
  async function signIn(email, password) {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      console.log("Successfully signed in as", getAuth().currentUser.email);
      return true;
    } catch (error) {
      console.log("Login details are invalid");
      return false;
    }
  }

  /**
   * If user currently signed in, sign out
   */
  function signOut() {
    getAuth().signOut();
  }

  /**
   * Uploads a habit to database
   * @param {Object} newHabit
   */
  async function createHabit(newHabit) {
    const email = await currentUser.email;
    const habitCollection = collection(db, "users", email, "habits");
    const docRef = await addDoc(habitCollection, newHabit);
    console.log("Created habit document ", docRef.id);
  }

  /**
   * Replaces an existing habit in database with new habit, based on their ids
   * @param {Object} habit habit to be updated
   */
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

  /**
   * Deletes all documents in habit collection where habit = given ID
   * @param {string} habitID ID of habit to be deleted
   */
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

  /**
   * Retrieves all habits for currently signed-in user
   * @returns {[Object]}
   */
  async function getAllHabits() {
    if (!(await currentUser)) return [];
    const email = currentUser.email;
    const habitCollection = collection(db, `users/${email}/habits`); // get habit collection for current user
    const querySnapshot = await getDocs(habitCollection);

    const habits = [];
    querySnapshot.forEach((docSnapshot) => {
      habits.push(docSnapshot.data());
    });
    return habits;
  }

  /**
   * Creates a new document in the `users` collection for a user.
   * @param {String} email
   * @param {String} password
   */
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
      console.log(error);
    }
    console.log("Created user document");
  }

  return {
    createNewAccount,
    isUserSignedIn,
    signIn,
    signOut,
    createHabit,
    deleteHabit,
    updateHabit,
    getAllHabits,
  };
}
