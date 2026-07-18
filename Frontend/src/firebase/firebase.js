// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "crayvo-foodtech.firebaseapp.com",
  projectId: "crayvo-foodtech",
  storageBucket: "crayvo-foodtech.firebasestorage.app",
  messagingSenderId: "316993348394",
  appId: "1:316993348394:web:c63749809952cc4c9ef453"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication service
export const auth = getAuth(app)

