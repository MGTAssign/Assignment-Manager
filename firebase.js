console.log("Firebase loading...");

const firebaseConfig = {
  apiKey: "PASTE_REAL_KEY_HERE",
  authDomain: "PASTE_REAL_AUTH_DOMAIN",
  projectId: "PASTE_REAL_PROJECT_ID",
  storageBucket: "PASTE_REAL_STORAGE_BUCKET",
  messagingSenderId: "PASTE_REAL_SENDER_ID",
  appId: "PASTE_REAL_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase initialized ✔");
