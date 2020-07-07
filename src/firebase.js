import { user, page } from './stores'
import { get } from 'svelte/store'
import Profile from './components/Profile.svelte'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAkXWbfEydMfb6_uH-6FiiJHtMsM2F4mfo',
  authDomain: 'ako-tutor.firebaseapp.com',
  databaseURL: 'https://ako-tutor.firebaseio.com',
  projectId: 'ako-tutor',
  storageBucket: 'ako-tutor.appspot.com',
  messagingSenderId: '1006098927451',
  appId: '1:1006098927451:web:382cec1ed4ac6a11ad147e'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

/* Signup
 * Logs the user into the provider with a pop-up, then
 * Updates the local user variable with the details from the login, then
 * Writes the user's email to the database to create a new user, then
 * Redirects to the Profile page.
 */
export async function signup() {
  // login
  let loginData = await auth.signInWithPopup(googleProvider)

  // update the user store
  user.set({
      uid: loginData.user.uid,
      firstName: '',
      lastName: '',
      email: loginData.user.email,
      school: '',
      Junior: [],
      'Level 1': [],
      'Level 2': [],
      'Level 3': [],
    })

  // write user to database
  db.collection('users').doc(loginData.user.uid).set({
      email: loginData.user.email
    })

  // redirect to the profile page
  page.set(Profile)
}

/* Login
 * Logs the user into the provider with a pop-up, then
 * Redirects to the Profile page.
 */
export async function login() {
  // get the user's data from the login information
  let loginData = await auth.signInWithPopup(googleProvider)

  let userRef = await db.collection('users').doc(loginData.user.uid).get()
  let userData = userRef.data()

  // update the user store
  user.set({
    uid: loginData.user.uid,
    ...userData })

  // redirect to the profile page
  page.set(Profile)
}

/* Logout
 * Signs the user our of their provider login, then
 * redirects to the home page, then
 * unloads the user information from the local user variable.
 */
export function logout() {
  auth.signOut()
  page.set(undefined)
  user.set(undefined)
}

/* Update Profile
 * Overwrites the data in the database with the data in the local user variable.
 */
export function updateProfile() {
  let data = get(user)

  db.collection('users').doc(data.uid).update({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    school: data.school,
    Junior: data.Junior,
    'Level 1': data['Level 1'],
    'Level 2': data['Level 2'],
    'Level 3': data['Level 3'],
  })
}

/* Get All Schools
 * Returns an array of the names of all schools in the database.
 */
export async function getAllSchools() {
  let schools = []

  // get all the school documents from the database
  let allSchoolsRef = await db.collection('schools').get()

  // create an array of the names of all the schools in the database
  allSchoolsRef.forEach(schoolRef => {
    schools.push(schoolRef.id)
  })

  // sort the schools for display purposes
  schools.sort()

  return schools
}

/* Get All Subjects
 * Returns a Map of the subjects with the key:value pairs as level:[subjects].
 */
export async function getAllSubjects() {
  let subjectsMap = new Map()

  // get all the subject documents from the database
  let allSubjectsRef = await db.collection('subjects').get()
 
  // create a map with level as the key and array of subjects as value, e.g.
  // |=====================================================|
  // |  KEY        ||  VALUE                               |
  // |=============||======================================|
  // | `Junior`    ||  [ `English`, `Maths`, `Science` ]   |
  // | `Level 1`   ||  [ `English`, `Maths`, `Science` ]   |
  // | `Level 2`   ||  [ `English`, `Maths`, `Science` ]   |
  // | `Level 3`   ||  [ `English`, `Maths`, `Science` ]   |
  // |=====================================================|
  allSubjectsRef.forEach(subjectRef => {
    let subjectData = subjectRef.data()
    subjectsMap.set(subjectRef.id, subjectData.subjects)
  })

  // sort the keys and values (arrays) for display purposes
  subjectsMap = new Map([...subjectsMap.entries()].sort())
  subjectsMap.forEach(level => { level.sort() })

  return subjectsMap
}

/* Find Tutor
 * Retrieves all the tutors from the database that fit the criteria, then
 * Creates an array of the tutors' data, then
 * Returns one random tutor from the array.
 */
export async function findTutor(school, level, subject) {
  let tutors = []

  // retrieve the tutors from the database that fit the criteria
  let tutorsRef = await db.collection('users')
                          .where('school', '==', school)
                          .where(level, 'array-contains', subject)
                          .get()

  // add the data for each tutor to an array
  tutorsRef.forEach(tutorRef => {
    let tutorData = tutorRef.data()
    tutors.push(tutorData)
  })

  // pick a random tutor to return
  let tutor = tutors[Math.floor(Math.random() * tutors.length)]

  return tutor
}
