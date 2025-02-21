import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5rUYXZMsUVjh7kd5E_R25i_kOOeVkP2U",
  authDomain: "mathapp-72693.firebaseapp.com",
  projectId: "mathapp-72693",
  storageBucket: "mathapp-72693.firebasestorage.app",
  messagingSenderId: "610363033704",
  appId: "1:610363033704:web:adadc5983b5201ba7c53dd",
  measurementId: "G-C38CVF1L5W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };