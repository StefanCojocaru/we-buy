// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, child, get } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCoRrVcIQNQ7Mqc9hDaq5sbFs_w2Xb7GGg',
  authDomain: 'we-buy-ead50.firebaseapp.com',
  databaseURL:
    'https://we-buy-ead50-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'we-buy-ead50',
  storageBucket: 'we-buy-ead50.appspot.com',
  messagingSenderId: '215924966201',
  appId: '1:215924966201:web:a85c75277566292a425ee8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getDatabase()
export const auth = getAuth(app)

export default db
