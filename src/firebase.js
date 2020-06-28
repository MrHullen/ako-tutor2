import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAkXWbfEydMfb6_uH-6FiiJHtMsM2F4mfo",
  authDomain: "ako-tutor.firebaseapp.com",
  databaseURL: "https://ako-tutor.firebaseio.com",
  projectId: "ako-tutor",
  storageBucket: "ako-tutor.appspot.com",
  messagingSenderId: "1006098927451",
  appId: "1:1006098927451:web:382cec1ed4ac6a11ad147e"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.firestore()