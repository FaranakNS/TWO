// importing the firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getAuth, firebase, firestoreDatase, signOut } from "firebase/auth";
// import { Button } from "bootstrap";

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
// geting the firestore database
const db = getFirestore();

// getting a table of users to input data

const colRef = collection(db, "Users");
let Name;
let Id;
let email;
let password;
let gender;
let postalCode;
let city;
let age;
let username;
let moveTouser;

getDocs(colRef).then((data) => {
  const data1 = data.docs.map((d) => ({ id: d.id, ...d.data() }));
  data1.map((e) => {
    console.log("e");
    console.log(e);

    Name = e.FullName;
    Id = e.id;
    username = e.UserName;
    email = e.Email;
    password = e.Password;
    gender = e.Gender;
    postalCode = e.PostalCode;
    city = e.City;
    age = e.Age;
    //moveTouser = e.id;
    console.log(e.id);
    for (var Key in data1) {
      var row = document.createElement("tr");

      const pbutton = document.createElement("img");
      pbutton.src = e.ProfilePic;
      //pbutton.innerHTML = "Profile";

      // console.log(e.UserId);
      pbutton.addEventListener("click", () => {
        //console.log(e);

        console.log("e.target");
        moveTouser = e.id;
        console.log(e.id);

        window.location.href =
          "../dist/redirectToProfile.html?moveTouser=" +
          encodeURIComponent(moveTouser);
      });
      row.appendChild(pbutton);

      // var nameCell = document.createElement('td');
      // nameCell.innerHTML = Name
      // row.appendChild(nameCell);

      var usercell = document.createElement("td");
      usercell.innerHTML = username;
      row.appendChild(usercell);

      // const detailCard = document.querySelector('.a-detail-card');
      // const detailButtons = document.querySelectorAll('button);
      const button = document.createElement("button");

      button.name = Name;
      button.Id = Id;
      button.email = email;
      button.password = password;
      button.gender = gender;
      button.postalCode = postalCode;
      button.city = city;
      button.age = age;
      button.innerHTML = "Details";

      button.addEventListener("click", async () => {
        var fullname = document.querySelector(".a-FullName");
        fullname.innerHTML = `${button.name}`;
        row.appendChild(fullname);

        var Id = document.querySelector(".a-Id");
        Id.innerHTML = `${button.Id}`;
        row.appendChild(Id);

        var email = document.querySelector(".a-email");
        email.innerHTML = `${button.email}`;
        row.appendChild(email);

        var password = document.querySelector(".a-Password");
        password.innerHTML = `${button.password}`;
        row.appendChild(password);

        var gender = document.querySelector(".a-Gender");
        gender.innerHTML = `${button.gender}`;
        row.appendChild(gender);

        var postalCode = document.querySelector(".a-PostalCode");
        postalCode.innerHTML = `${button.postalCode}`;
        row.appendChild(postalCode);

        var city = document.querySelector(".a-City");
        city.innerHTML = `${button.city}`;
        row.appendChild(city);

        var age = document.querySelector(".a-Age");
        age.innerHTML = `${button.age}`;
        row.appendChild(age);
      });

      row.appendChild(button);
    }
    document.getElementById("table-body").appendChild(row);
  });
});

// accessing the registration form
const registertrationForm = document.querySelector(".r-form");

var menuLink = document.getElementById("a-menu-link");
var submenu = document.querySelector(".a-submenu");

menuLink.addEventListener("click", function (event) {
  event.preventDefault();
  submenu.style.display = "block";
});

const logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("the user is log out!!");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
