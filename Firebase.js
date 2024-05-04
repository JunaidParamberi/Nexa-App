import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCKH8ahX6DNpY9LKIug94evd9GM3GZ6wDY",
  authDomain: "nexa-play.firebaseapp.com",
  projectId: "nexa-play",
  storageBucket: "nexa-play.appspot.com",
  messagingSenderId: "840258982662",
  appId: "1:840258982662:web:b710da6b2ac79470d5c487"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

