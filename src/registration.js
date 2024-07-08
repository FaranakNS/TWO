// importing the firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  filteredUsers,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

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
initializeApp(firebaseConfig);

// initialize authorization
const auth = getAuth();
// geting the firestore database
const db = getFirestore();

// getting a table of users to input data

const colRef = collection(db, "Users");

getDocs(colRef).then((data) => {
  const data1 = data.docs.map((d) => ({ id: d.id, ...d.data() }));
  data1.map((e) => {
    console.log(e);
  });
});

// accessing the registration form
const registertrationForm = document.querySelector(".r-form");
console.log(registertrationForm);

//Register the user

registertrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = registertrationForm.email.value;
  const password = registertrationForm.password.value;
  const username = registertrationForm.username.value;

  const g = query(colRef, where("UserName", "==", username));
  const s = getDocs(g);
  // console.log(g);
  s.then((querySnapshot) => {
    if (!querySnapshot.empty) {
      // The username already exists
      alert("Username already taken. Please choose a different one.");
      return;
    } else {
      const passwordConfirm = registertrationForm.Password.value;
      console.log(email, password);

      // check for email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        alert("please enter a valid email address.");
      }
      //check that the password eets minimum length requirements
      if (password.length < 8) {
        alert("password must be atleast 8 characters.");
        return;
      }

      //check that the password and password confirmation match
      if (password !== passwordConfirm) {
        alert("password do not match");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password).then(() => {
        sendEmailVerification(auth.currentUser);
       
        window.confirm("Please Verify the email");

        console.log("send");

        if (auth.currentUser.emailVerified) {
          //This will return true or false
          console.log("email is verified");
        } else {
          console.log("email not verified");
        }

        console.log("send");
        addDoc(colRef, {
          UserName: registertrationForm.username.value,
          Email: registertrationForm.email.value,
          FullName: registertrationForm.fullName.value,
          Gender: registertrationForm.gender.value,
          PostalCode: registertrationForm.postalCode.value,
          City: registertrationForm.City.value, //
          Age: registertrationForm.age.value,
          ProfilePic:
            "https://img.freepik.com/premium-vector/male-profile-flat-blue-simple-icon-with-long-shadowxa_159242-10092.jpg",
        }).then(() => {
        window.location.href="../dist/index.html";
        })
      });
    }
  });
});

//export { filteredUsers };
