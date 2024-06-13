//import { initializeApp } from "firebase/app";
const { initializeApp }  = require('firebase/app');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNae-xCICskkycOzoimEHAlTdfVqloIIs",
  authDomain: "ejercicio-tienda-2024-lmn.firebaseapp.com",
  projectId: "ejercicio-tienda-2024-lmn",
  storageBucket: "ejercicio-tienda-2024-lmn.appspot.com",
  messagingSenderId: "593984276886",
  appId: "1:593984276886:web:dbc4be7006d7a5c30975b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = { app };