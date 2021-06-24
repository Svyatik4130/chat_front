import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp({
  apiKey: "AIzaSyCHHWoc_3biZtQgBVky9ei4ZWYSCfYBSOA",
  authDomain: "chat-test-react-7681d.firebaseapp.com",
  projectId: "chat-test-react-7681d",
  storageBucket: "chat-test-react-7681d.appspot.com",
  messagingSenderId: "1097162140304",
  appId: "1:1097162140304:web:81473ddc7152e9e2104615",
  measurementId: "G-LYQLZ63QSJ"
})

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider value={{firebase, auth, firestore}} >
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
