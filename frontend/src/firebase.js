import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // import auth from firebase/auth

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "expense-tracker-25e24.firebaseapp.com",
  projectId: "expense-tracker-25e24",
  storageBucket: "expense-tracker-25e24.appspot.com",
  messagingSenderId: "995173626708",
  appId: "1:995173626708:web:f564569fb266be95c34ec1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // initialize and export auth module
