import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'



const config = {
  apiKey: 'AIzaSyDLa26ETtL8KPVwJ9yoJ0LbwXqI30l85Iw',
  authDomain: 'redesocial-6ed52.firebaseapp.com',
  projectId: 'redesocial-6ed52',
  storageBucket: 'redesocial-6ed52.appspot.com',
  messagingSenderId: '6120526930',
  appId: '1:6120526930:web:502e0b3ea899a494083b8b',
  measurementId: 'G-EH0DW99K7P'
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const deleteDoc  = firebase.firestore;
const doc  = firebase.firestore;
const db  = firebase.firestore();
const storage = firebase.storage("gs://redesocial-6ed52.appspot.com");

export { firebase, FieldValue, storage, deleteDoc, doc, db }
