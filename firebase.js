console.log("🔥 firebase.js IS LOADING");

// 🔥 REPLACE THESE WITH YOUR REAL FIREBASE VALUES
const firebaseConfig = {
  apiKey: "PASTE_REAL_API_KEY_HERE",
  authDomain: "PASTE_REAL_AUTH_DOMAIN_HERE",
  projectId: "PASTE_REAL_PROJECT_ID_HERE",
  storageBucket: "PASTE_REAL_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_REAL_SENDER_ID_HERE",
  appId: "PASTE_REAL_APP_ID_HERE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase initialized ✔");
