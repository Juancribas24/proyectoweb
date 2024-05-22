// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIpTVaRw79cDWkX7LXAuArBdGZR9iPIRY",
  authDomain: "torneos-722ee.firebaseapp.com",
  projectId: "torneos-722ee",
  storageBucket: "torneos-722ee.appspot.com",
  messagingSenderId: "385950444102",
  appId: "1:385950444102:web:cbca76eb47ac0140fa3847"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(appFirebase);

export { appFirebase, auth, googleProvider, db };

export default appFirebase;
