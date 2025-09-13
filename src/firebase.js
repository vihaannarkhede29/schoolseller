import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyACDw126dB0oFaDjQvfltHmc7IORwnqjjg",
  authDomain: "schoolseller-f474f.firebaseapp.com",
  projectId: "schoolseller-f474f",
  storageBucket: "schoolseller-f474f.appspot.com",
  messagingSenderId: "215016043404",
  appId: "1:215016043404:web:ba8dd96a4d2cdccc9bdca9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;

