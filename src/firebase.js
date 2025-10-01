import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBUjF_NNCynQXvBjjQjgbHgPPNIK0w0sBA",
  authDomain: "instagram-clone-curso-2a24f.firebaseapp.com",
  projectId: "instagram-clone-curso-2a24f",
  storageBucket: "instagram-clone-curso-2a24f.firebasestorage.app",
  messagingSenderId: "341842585913",
  appId: "1:341842585913:web:95c86fd64e0676ff3920e8",
  measurementId: "G-RP1M31L37R"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };