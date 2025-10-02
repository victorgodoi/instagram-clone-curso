// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBUjF_NNCynQXvBjjQjgbHgPPNIK0w0sBA",
  authDomain: "instagram-clone-curso-2a24f.firebaseapp.com",
  projectId: "instagram-clone-curso-2a24f",
  storageBucket: "instagram-clone-curso-2a24f.firebasestorage.app",
  messagingSenderId: "341842585913",
  appId: "1:341842585913:web:95c86fd64e0676ff3920e8",
  measurementId: "G-RP1M31L37R"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { db, auth, storage, functions };