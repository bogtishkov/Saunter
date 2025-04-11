import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdHftzL1spPCLS1dzQUeAViqGIQqibEto",
  authDomain: "saunter-7b153.firebaseapp.com",
  projectId: "saunter-7b153",
  storageBucket: "saunter-7b153.appspot.com",
  messagingSenderId: "541849940389",
  appId: "1:541849940389:web:8d0d735713be564bf2784c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
