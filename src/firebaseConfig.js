import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxLmYzcE0jwwvFPkxM_aEcmfj7d5YQ2Lc",
  authDomain: "to-do-app-6cdc1.firebaseapp.com",
  projectId: "to-do-app-6cdc1",
  storageBucket: "to-do-app-6cdc1.firebasestorage.app",
  messagingSenderId: "119837000293",
  appId: "1:119837000293:web:a2f6b917361407e239fc8c",
  measurementId: "G-DW0PF3FXTP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
