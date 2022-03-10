// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1H4kXHV59W2AK6Y9BZYYlMAvoCBkCkcU",
  authDomain: "cs-147-d6c5f.firebaseapp.com",
  databaseURL: "https://cs-147-d6c5f-default-rtdb.firebaseio.com",
  projectId: "cs-147-d6c5f",
  storageBucket: "cs-147-d6c5f.appspot.com",
  messagingSenderId: "497445985457",
  appId: "1:497445985457:web:f5b5b76c261956eb2d9690",
  measurementId: "G-QVV1B9GXTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const storage = getStorage(app)
export default database;