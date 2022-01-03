import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDwwvVRfv-j1Xb6I6eafWvXOhTsbYoDPb8",
  authDomain: "learns-a-lot.firebaseapp.com",
  projectId: "learns-a-lot",
  storageBucket: "learns-a-lot.appspot.com",
  messagingSenderId: "449942385596",
  appId: "1:449942385596:web:c69882c8f4a520d769b1b9",
});

const db = getFirestore();
const auth = getAuth();

export default { db, auth };
