import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3c6PZ-kTRXmQwF1bM3UIk5JUwR-zE2vg",
  authDomain: "fir-integration-3613c.firebaseapp.com",
  databaseUrl: "https://fir-integration-3613c-default-rtdb.firebaseio.com",
  projectId: "fir-integration-3613c",
  storageBucket: "fir-integration-3613c.firebasestorage.app",
  messagingSenderId: "191701394662",
  appId: "1:191701394662:web:a256a5f2c4ae68904a4727",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
