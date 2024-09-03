// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAr6tV2tq_14GrA_Bic6FA2ogl_cP07r6Q",
  authDomain: "mern-b5235.firebaseapp.com",
  projectId: "mern-b5235",
  storageBucket: "mern-b5235.appspot.com",
  messagingSenderId: "899430549029",
  appId: "1:899430549029:web:b1184e529cffad156121cc",
  measurementId: "G-8QHKT4SLRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
