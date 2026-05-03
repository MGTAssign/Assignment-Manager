console.log("🔥 firebase.js IS LOADING");

const firebaseConfig = {
  apiKey: "AIzaSyBxWrtow_qvplxLYRXFuiYa2V4zwawv0Ss",
  authDomain: "assignment-tracker-8c7b9.firebaseapp.com",
  projectId: "assignment-tracker-8c7b9",
  storageBucket: "assignment-tracker-8c7b9.appspot.com",
  messagingSenderId: "254719298457",
  appId: "1:254719298457:web:13a175e0b91a7a626d6108"
};

// INIT FIREBASE (MUST COME AFTER IMPORTS)
firebase.initializeApp(firebaseConfig);

// SERVICES
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase initialized ✔");
