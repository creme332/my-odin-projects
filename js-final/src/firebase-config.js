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

export function getFirebaseConfig() {
  const config = {
    apiKey: "AIzaSyACfbUQ6zyeqIPCpj22Ij0LfTXYK1B5or0",
    authDomain: "qkwiqq.firebaseapp.com",
    projectId: "qkwiqq",
    storageBucket: "qkwiqq.appspot.com",
    messagingSenderId: "762195726811",
    appId: "1:762195726811:web:54e69341ac9400df3057fe",
  };
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
