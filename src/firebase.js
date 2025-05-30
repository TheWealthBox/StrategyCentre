/* global __firebase_config __initial_auth_token */
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// !! IMPORTANT !!
// Replace the placeholder values with your actual Firebase project configuration.
// You can find this in your Firebase project settings -> Project settings -> Your apps -> Web app
const localFirebaseConfig = {
  apiKey: "AIzaSyBp0maTAHXW13Mezxy3DisaizeGdMgFs80", // Your actual API Key
  authDomain: "strategycentre-wealthbox.firebaseapp.com", // Your actual Auth Domain
  projectId: "strategycentre-wealthbox", // Your actual Project ID
  storageBucket: "strategycentre-wealthbox.firebasestorage.app", // Your actual Storage Bucket
  messagingSenderId: "824226969694", // Your actual Messaging Sender ID
  appId: "1:824226969694:web:f8de71f1390bf08d85ccf", // Your actual App ID
  measurementId: "G-D8RFTGD497" // Your actual Measurement ID (optional)
};

// Use the Canvas provided config if available, otherwise use local config
const firebaseConfig = typeof __firebase_config !== 'undefined'
  ? JSON.parse(__firebase_config)
  : localFirebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// This is a placeholder for a custom authentication token.
// In a real application, this token would be securely generated on your backend
// and passed to the frontend for authentication.
// For demonstration purposes, we might use a hardcoded token or rely on anonymous auth.
const initialAuthToken = typeof __initial_auth_token !== 'undefined'
  ? __initial_auth_token
  : null; // Set to null to use anonymous auth fallback in App.js or remove if not needed.

// Export ALL necessary Firebase instances and functions
export {
  db,
  auth,
  initialAuthToken,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  onSnapshot,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};
