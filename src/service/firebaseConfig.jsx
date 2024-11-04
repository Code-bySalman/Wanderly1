// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRiQt-vCLwlqZaS4ZT51jkR8AcRHjDRuA",
  authDomain: "wanderly-3d37f.firebaseapp.com",
  projectId: "wanderly-3d37f",
  storageBucket: "wanderly-3d37f.appspot.com",
  messagingSenderId: "280801538336",
  appId: "1:280801538336:web:91d9a9e97e316d89fc2745",
  measurementId: "G-RYZX4BBZH3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
