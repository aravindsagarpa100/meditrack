import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYFqP6QPPmW9o_BVm1QAiVws9Ssd_XFtY",
  authDomain: "meditrack-16cc6.firebaseapp.com",
  projectId: "meditrack-16cc6",
  storageBucket: "meditrack-16cc6.firebasestorage.app",
  messagingSenderId: "570450615587",
  appId: "1:570450615587:web:46cdee5ed1cd3283e4c096"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  ref,
  uploadBytes,
  getDownloadURL
};
