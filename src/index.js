// importing the firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {
  getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, emailVerified
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs8lcJfdBO2xahG9qRHfQxbZlM_WdEZvw",
  authDomain: "world2opinion.firebaseapp.com",
  databaseURL: "https://world2opinion-default-rtdb.firebaseio.com",
  projectId: "world2opinion",
  storageBucket: "world2opinion.appspot.com",
  messagingSenderId: "872516887044",
  appId: "1:872516887044:web:d2e3e426362b0d47dc8b51",
  measurementId: "G-0KNC73MJ16"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize authorization
const auth = getAuth();
console.log(auth)
// geting the firestore database
const db = getFirestore();



const loginUser = document.querySelector('.l-form');


const forgetPasswordLink = document.querySelector(".forget_password")

//login the user

loginUser.addEventListener('submit', (event) => {
  console.log('clicked')
const email = loginUser.email.value
const password = loginUser.psw.value
  event.preventDefault()

  //This will return true or false

  signInWithEmailAndPassword(auth, email, password)
    .then((login) => {
      console.log(login)
      const user = login.user;
      if (user.emailVerified) {
        console.log('email is verified')
        console.log('user logged:', login.user)
        window.location.href = "../dist/discover.html"
        loginUser.reset()
      }
      else{
        alert('Please verify your email');
      }

    })
    .catch((err) => {
      console.log(err.message)
    })




})

console.log(loginUser.email.value)
forgetPasswordLink.addEventListener("click", () => {
  
  //forget password
  sendPasswordResetEmail(auth, loginUser.email.value)
    .then(() => {
      // Password reset email sent successfully
      alert('Password reset email sent. Please check your inbox.');
       loginUser.reset()
    })
    .catch((error) => {
      // Handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });


})
