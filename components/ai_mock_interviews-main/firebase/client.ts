// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADo6GzkLGA2XBVUu8WJRLvn0L-QIeYp88",
  authDomain: "mocksense-d9269.firebaseapp.com",
  projectId: "mocksense-d9269",
  storageBucket: "mocksense-d9269.firebasestorage.app",
  messagingSenderId: "119112312879",
  appId: "1:119112312879:web:73aff886b827569636beda",
  measurementId: "G-YVXEMNLVV6"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
