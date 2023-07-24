// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKwgvE1n2xdIkPKgtd2sNaEMqKBYFf4Ps",
  authDomain: "noteslist-vue-8c17e.firebaseapp.com",
  projectId: "noteslist-vue-8c17e",
  storageBucket: "noteslist-vue-8c17e.appspot.com",
  messagingSenderId: "166078937310",
  appId: "1:166078937310:web:3769b5acb2476b4f51ea4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth=getAuth(app)

export {db,auth}