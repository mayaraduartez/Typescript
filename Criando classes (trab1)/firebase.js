
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCip5APfKpn3BcBpAi1YF8GiDYUVG6LQ0",
  authDomain: "mayara-99fc6.firebaseapp.com",
  projectId: "mayara-99fc6",
  storageBucket: "mayara-99fc6.appspot.com",
  messagingSenderId: "321590378367",
  appId: "1:321590378367:web:c6bd7c8af1aa3d55c4644a",
  measurementId: "G-0C31ZF1HMP"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };