// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBybVAuK7WyIsbSM5ULnL6gE1jQBMxcntA",
  authDomain: "householdtypescript-15b28.firebaseapp.com",
  projectId: "householdtypescript-15b28",
  storageBucket: "householdtypescript-15b28.firebasestorage.app",
  messagingSenderId: "163659291368",
  appId: "1:163659291368:web:da8675cf4d2181799f075d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestore인스턴스
const db = getFirestore(app);

export { db };
