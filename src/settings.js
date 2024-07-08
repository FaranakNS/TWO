console.log('Settings js loaded');

import { initializeApp } from "firebase/app";
import { getDocs, setDoc, doc, getFirestore, querySnapshot, onSnapshot, query, where, collection, getDoc, updateDoc, addDoc, getCountFromServer, deleteDoc, length } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"

// Your web app's Firebase configuration
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
const auth = getAuth();
// geting the firestore database
const db = getFirestore();
// getting signed user credentials
let signInEmail;
const colRef = collection(db, "Users")
const storage = getStorage();


let Name;
let UserName;
let ProfilePic;
let UserId;
let Age;
let City;
let postalCode;
let Gender;

const postRef = collection(db, "Posts")


auth.onAuthStateChanged(function (user) {
	if (user) {
		console.log("user id")
		console.log(auth.currentUser.email)
		signInEmail = auth.currentUser.email
		if (signInEmail === "twocapstoneprojectnait@gmail.com") {
			console.log("WELCOME")
			const button = document.createElement('button');
			const adminLink = document.querySelector(".s-admin")
			button.innerHTML = "AdminPage"
			adminLink.append(button)
			button.addEventListener(("click"), () => {
				console.log("HIIIIIIIIIIIIIIIIIIIII")
				window.location.href = "../dist/admin.html";
			})
		}

	} else {
		console.log('No user is signed in.')
	}


	const getCurrentUser = query(colRef, where("Email", "==", signInEmail))


	const getCurrentUserData = getDocs(getCurrentUser)

	getCurrentUserData.then((data) => {
		const response =
			data.docs.map(d => ({ id: d.id, ...d.data() }))
		response.map(results => {
			console.log("results")
			console.log(results)
			console.log(results.FullName);

			Name = results.FullName;
			UserName = results.UserName;
			Age = results.Age;
			City = results.City;
			postalCode = results.PostalCode;
			Gender = results.Gender;
			ProfilePic = results.ProfilePic
			UserId = results.id

			console.log(results)

			var fname = document.querySelector(".s-fullName");
			var uname = document.querySelector(".s-username");
			var age = document.querySelector(".s-Age");
			var city = document.querySelector(".City");
			var postal_code = document.querySelector(".postalCode");
			var profile = document.querySelector(".s-profile-photo");
			var gender = document.querySelector(".r-dropdown")

			profile.src = ProfilePic;

			fname.placeholder = Name;
			fname.value = Name;
			uname.placeholder = UserName;
			uname.value = UserName;

			age.value = Age;
			city.value = City;
			postal_code.value = postalCode;
			gender.value = Gender;


			console.log(fname.placeholder);

		});

	})


});

const updateProfilePic = document.querySelector('.s-profile-photo')
updateProfilePic.addEventListener('click', (event) => {
	console.log("uo")
	galleryaccessed()
})


const profileEditForm = document.querySelector('.s-form')
console.log(profileEditForm)

profileEditForm.addEventListener('submit', (event) => {
	event.preventDefault()



	const docRef = doc(colRef, UserId);
	console.log('submit button clicked')


	updateDoc(docRef, {
		UserName: profileEditForm.username.value,
		FullName: profileEditForm.fullName.value,
		Age: profileEditForm.age.value,
		City: profileEditForm.City.value,
		postalCode: profileEditForm.postalCode.value,
		Gender: profileEditForm.gender.value
	})
		.then(() => {
			alert("Profile updated successfully!");
		})
		.catch((error) => {
			error("Error updating Profile: ", error);
		});

})


const deletebutton = document.querySelector('.s-delete-button');

deletebutton.addEventListener('click', function () {
	// code to run when the button is clicked
	console.log('delete button is clicked')
	const postSubcollection = query(postRef, where("UserId", "==", UserId))

	const usercollection = doc(colRef, UserId)
	const subImagesCollection1 = collection(usercollection, "Posts")
	
	const imagesData = getDocs(subImagesCollection1)
	imagesData.then((data) => {
		const data2 = data.docs.map(d => ({ id: d.id, ...d.data() })
		)

		data2.map((e) => {
			console.log("JI")
			console.log(e)
			deleteDoc(doc(db, "Users", UserId, "Posts", e.id))
		}
		)})
	const resultsData = getDocs(postSubcollection)

	resultsData.then((data) => {
		const response =

			data.docs.map(d => ({ id: d.id, ...d.data() }))
		console.log(data)
		response.map((results) => {
			console.log(results)
			if ( deleteDoc(doc(db, "Posts", results.id))) {

			}
		})
	})

	console.log(UserId)
	(deleteDoc(doc(db, "Users", UserId)) && auth.currentUser.delete()) 
	// 	console.log("Deleted")
	// }




	// auth.currentUser.delete().then(function () {
	// 	// User deleted successfully
	// 	console.log('user deleted successfully')
	// 	//window.location.href = '/Firebase_Login/dist';

	// }).catch(function (error) {
	// 	// An error occurred while deleting the user
	// 	console.log(error.message)
	// });



});

const logoutbutton = document.querySelector('.s-logout-button');

logoutbutton.addEventListener('click', function () {
	// code to run when the button is clicked
	console.log('logout button is clicked')
	// auth.signOut()

	auth.signOut().then(() => {
		// Sign-out successful.
		console.log("the user is log out!!")
		window.location.href = '../dist/index.html';

	}).catch((error) => {
		// An error happened.
		console.log(error.message);
	});

});
function galleryaccessed() {
	// check if the browser can get the File API
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// create a new file input element
		var input = document.createElement('input');
		input.type = 'file';

		// add an event listener to the file input element
		input.addEventListener('change', function (e) {
			e.preventDefault();

			// Display the file


			for (var i = 0; i < input.files.length; i++) {
				var file = input.files[i];
				var image = document.createElement('img');
				const link = image.src = URL.createObjectURL(file);


				const container = document.querySelector('.s-profile-photo')
				console.log(container)
				container.src = link

				const uploadFile = () => {
					const name = new Date().getTime() + file.name





					const fileRef = ref(storage, "Images/" + file.name);

					const uploadTask = uploadBytesResumable(fileRef, file);

					uploadTask.on(
						"state_changed",
						(snapshot) => {

							const progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							// console.log("upload is " + progress + "% done");
							switch (snapshot.state) {
								case "paused":
									// console.log("upload is paused");
									break;
								case "running":
									// console.log("upload is running");
									break;
								default:
									break;
							}
						},
						(error) => {
							// console.log(error)
						},
						() => {


							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

								const docRef = doc(colRef, UserId);

								updateDoc(docRef, {
									ProfilePic: downloadURL
								})

							})
						})
				}
				file && uploadFile()

			}
		});
		input.click();

	}
	else {

		alert('Your browser does not support the File API');
	}

}





