console.log("Firebase loading...");

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// 🔐 AUTH
const auth = firebase.auth();

// 📦 FIRESTORE (CRITICAL — this is what you were missing/causing issues before)
const db = firebase.firestore();

console.log("Firebase initialized ✔");
