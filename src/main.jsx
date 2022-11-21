import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'
import './GlobalStyle.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
)
