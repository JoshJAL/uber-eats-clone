import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.firebaseAPIkey,
  authDomain: "react-native-uber-eats-c-f878d.firebaseapp.com",
  projectId: "react-native-uber-eats-c-f878d",
  storageBucket: "react-native-uber-eats-c-f878d.appspot.com",
  messagingSenderId: "273194045009",
  appId: "1:273194045009:web:cd140234980a2516747270",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
