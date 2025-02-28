import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjRlxO1_VbEB5zlgstKyqf03d5woR4Yfo",
  authDomain: "beg4burger-89ed4.firebaseapp.com",
  databaseURL: "https://beg4burger-89ed4-default-rtdb.firebaseio.com",
  projectId: "beg4burger-89ed4",
  storageBucket: "beg4burger-89ed4.firebasestorage.app",
  messagingSenderId: "434885857547",
  appId: "1:434885857547:web:f2921ca5280ca36911d20e",
  measurementId: "G-DEB3028LGN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
