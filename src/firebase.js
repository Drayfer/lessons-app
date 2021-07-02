import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyB1IN0KZoNwB4braHlAIWYej7BElx34qKE",
  authDomain: "auth-test-c887a.firebaseapp.com",
  projectId: "auth-test-c887a",
  storageBucket: "auth-test-c887a.appspot.com",
  messagingSenderId: "274278142464",
  appId: "1:274278142464:web:fc570612bacd6ea3e9fee5"
})

export const auth = app.auth()
export default app
