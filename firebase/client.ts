// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
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
const app = !getApps.length? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);