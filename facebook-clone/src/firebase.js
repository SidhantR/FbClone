// import * as firebase from "firebase";
// import "firebase/auth"
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDUseupJ-BGzQztwb3rznRFhslfXz4wV_w",
//   authDomain: "fb-mern-980fa.firebaseapp.com",
//   projectId: "fb-mern-980fa",
//   storageBucket: "fb-mern-980fa.appspot.com",
//   messagingSenderId: "482135750646",
//   appId: "1:482135750646:web:d1b9e6b34d6848bcdd39d7",
//   measurementId: "G-V6LEF9ELCX"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig)

// const db = firebaseApp.firestore()
// const auth = firebase.auth()
// const provider = new firebase.auth.GoogleAuthProvider()

// export  { auth, provider }
// export default db


import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDUseupJ-BGzQztwb3rznRFhslfXz4wV_w",
  authDomain: "fb-mern-980fa.firebaseapp.com",
  projectId: "fb-mern-980fa",
  storageBucket: "fb-mern-980fa.appspot.com",
  messagingSenderId: "482135750646",
  appId: "1:482135750646:web:d1b9e6b34d6848bcdd39d7",
  measurementId: "G-V6LEF9ELCX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db