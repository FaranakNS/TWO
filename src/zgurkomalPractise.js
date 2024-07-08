
// importing the firebase
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import {
    getAuth, createUserWithEmailAndPassword, sendEmailVerification
} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxzRkwIxW8qEZFubLc_qVIY4IshFS9HCQ",
    authDomain: "the-world-s-opinion-e6dac.firebaseapp.com",
    databaseURL: "https://the-world-s-opinion-e6dac-default-rtdb.firebaseio.com",
    projectId: "the-world-s-opinion-e6dac",
    storageBucket: "the-world-s-opinion-e6dac.appspot.com",
    messagingSenderId: "514208223527",
    appId: "1:514208223527:web:4fe7598ef068908f73d902"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize authorization
const auth = getAuth();
// geting the firestore database
const db = getFirestore();

// getting a table of users to input data

const colRef = collection(db, "Users")


 getDocs(colRef)
 .then((data)=>{
    const data1 = 
    data.docs.map(d=>({id:d.id, ...d.data()}))
    data1.map(e => {
        console.log(e)
    });
 })


// accessing the registration form
const registertrationForm = document.querySelector('.r-form')



   
    
        
        
