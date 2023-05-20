import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
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
   * @param {string} userID
   */
  async function createUser(userID) {
    await setDoc(doc(usersRef, userID), {
      name: user.displayName,
      country: "Global",
      id: userID,
      joinDate: serverTimestamp(),
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
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
    console.log("No such document!");

    return null;
  }
  return { createNewProfile, getUserData };
}
