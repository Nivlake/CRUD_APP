import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDHJCxAx9cGKMR8tD0nFQAkAyyKK-HCi38",
    authDomain: "crud-app-d01f6.firebaseapp.com",
    projectId: "crud-app-d01f6",
    storageBucket: "crud-app-d01f6.appspot.com",
    messagingSenderId: "705188098387",
    appId: "1:705188098387:web:af0e4d84f41e4b5a8471a6"
  };
  firebase.initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth();

  export const firestore = firebase.firestore();

  export const realtime = firebase.database();

  export default firebase;

