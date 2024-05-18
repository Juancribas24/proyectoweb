// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export default appFirebase;