import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyD8Gj13huyyv1j6LDNxVGzQFkqE6_iHgrg",
  authDomain: "lessons-app-ce426.firebaseapp.com",
  databaseURL: "https://lessons-app-ce426-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lessons-app-ce426",
  storageBucket: "lessons-app-ce426.appspot.com",
  messagingSenderId: "984823297044",
  appId: "1:984823297044:web:8240c3caf0e588a5342301"


})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const database = firebase.database();
export default firebase
