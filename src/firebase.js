import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

firebase.initializeApp({
  // apiKey: "AIzaSyB1IN0KZoNwB4braHlAIWYej7BElx34qKE",
  // authDomain: "auth-test-c887a.firebaseapp.com",
  // projectId: "auth-test-c887a",
  // storageBucket: "auth-test-c887a.appspot.com",
  // messagingSenderId: "274278142464",
  // appId: "1:274278142464:web:fc570612bacd6ea3e9fee5"
  apiKey: "AIzaSyAIpIyhg-sI4OB0a7ADoHWjZ8NqlYV3tiU",
  authDomain: "lessons-app-42f67.firebaseapp.com",
  projectId: "lessons-app-42f67",
  storageBucket: "lessons-app-42f67.appspot.com",
  messagingSenderId: "597044287089",
  appId: "1:597044287089:web:10d4fdc94cf587f22dadd0"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const database = firebase.database();
export default firebase
