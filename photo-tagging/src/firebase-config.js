/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
//! Add security rules to your database before exposing config publicly
//! Reference: https://stackoverflow.com/a/37484053/17627866
const config = {
  apiKey: "AIzaSyDmQiDF-BdE26JTUcudlYQOkpXJbDXHTyk",
  authDomain: "enigma69.firebaseapp.com",
  projectId: "enigma69",
  storageBucket: "enigma69.appspot.com",
  messagingSenderId: "334386567767",
  appId: "1:334386567767:web:062d6409f8107cd162e112",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
