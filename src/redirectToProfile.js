var urlParams = new URLSearchParams(window.location.search)

var userID = urlParams.get('moveTouser')



import { initializeApp } from "firebase/app";
import { getDocs, setDoc, doc, getFirestore, query, where, collection, getDoc, updateDoc, addDoc, getCountFromServer, querySnapshot, deleteDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getDatabase, once } from "firebase/database"
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"

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
const userRef = collection(db, "Users")
const postRef = collection(db, "Posts")

const storage = getStorage();



let Name;
let UserName;
let ProfilePic;
let UserId;
let moveTouser;
// display data on profile page
const getCurrentUserData = getDocs(userRef)

getCurrentUserData.then((data) => {

	const response =
		data.docs.map(d => ({ id: d.id, ...d.data() }))
	response.map(results => {
		if (results.id == userID) {
			Name = results.FullName;
			UserName = results.UserName;
			ProfilePic = results.ProfilePic
			UserId = results.id
		}
	});
	// display name
	let name = document.querySelector(".p-fullname");
	name.innerHTML = Name;




	//displey username
	let username = document.querySelector(".p-username")

	username.innerHTML = UserName

	let profilePic = document.querySelector(".p-profile-display")
	// change profile pic
	profilePic.src = ProfilePic;
	// accesing the images inside the users
	const imagesRef = collection(db, "Posts");
	const usercollection = doc(userRef, UserId)

	const subImagesCollection1 = collection(usercollection, "Posts")

	const friendsCollection = collection(usercollection, "Friends")


	// displaying the count for posts 
	let numberOfPosts = document.querySelector(".p-numberOfPosts");

	const imagesData = getDocs(subImagesCollection1)
	let postID;
	imagesData.then((data) => {
		const data2 = data.docs.map(d => ({ id: d.id, ...d.data() })
		)

		data2.map((e) => {
			const postSubcollection = query(postRef, where("postId", "==", e.id))
				const resultsData = getDocs(postSubcollection)
				console.log(resultsData)

				const fileExtension = e.ImageUrl.split('.').pop().toLowerCase();
				const fileExtension2 = fileExtension.split('.').pop().toLowerCase();

				let imageElement;
				if (fileExtension2.startsWith('mp4') ){
					imageElement = document.createElement('video');

				  } 
				else{
					imageElement = document.createElement('img');
				}
				
				imageElement.src = e.ImageUrl;
				const divPOST = document.createElement("div")
				divPOST.appendChild(imageElement)


				//console.log(element)
				resultsData.then((data) => {
					const response =

						data.docs.map(d => ({ id: d.id, ...d.data() }))
					console.log(data)
					response.map((results) => {
						postID = results.id
						console.log("res")
						console.log(results)
						const text = document.createElement("p")
						text.innerHTML = results.text
						if(text.textContent.length>10){
							console.log("JIIIIIIIIIIIIIIIIIIIIIIIIII")
							text.style.fontSize = "0.25rem";
						}
						console.log(text.textContent)
						if(text.textContent.length!==0){
							divPOST.appendChild(text)
							console.log("OOOOOO")
							
						}
						
						
						document.querySelector('.p-post-container').appendChild(divPOST);/// displaying the post
						/////////////////////////code to display result card................................
						divPOST.addEventListener("click", element => {

						document.querySelector('.p-post-container').style.visibility = "hidden";

							response.map((results) => {
								postID = results.id
								console.log("res")
								console.log(results)
								
							
							const postData = getDocument("Posts", postID)
							postData.then((data) => {
								console.log(data)

								
								let imgContainer = document.querySelector('.p-clickedpost-container');

								if((data.ImageUrl.split('.').pop().toLowerCase().split('.').pop().toLowerCase()).startsWith('mp4'))
								{
									imgContainer.innerHTML =`
									<video autoplay class="p-post-active" src="${data.ImageUrl}" alt="img" title="image">`

								}
								else{
								imgContainer.innerHTML =`
								<img class="p-post-active" src="${data.ImageUrl}" alt="img" title="image">`
								}

								imgContainer.innerHTML += 	`<svg class="p-two-logo" id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.81 65.81"><defs><style>.cls-1{fill:#fdce8d;}.cls-2,.cls-3{fill:#fff;}.cls-4{fill:#194789;}.cls-5{fill:none;}.cls-5,.cls-3{stroke-linecap:round;}.cls-5,.cls-3,.cls-6{stroke:#fff;stroke-miterlimit:10;}.cls-3{stroke-width:.75px;}.cls-6{fill:#f7961d;stroke-width:3px;}</style></defs><g id="Layer_1-2"><g><g><rect class="cls-4" width="65.81" height="65.81" rx="12" ry="12"/><circle class="cls-6" cx="32.91" cy="28.19" r="16.73"/><circle class="cls-1" cx="32.91" cy="32.41" r="10.37"/><line class="cls-5" x1="25.83" y1="38.25" x2="39.99" y2="38.25"/><line class="cls-5" x1="32.84" y1="38.95" x2="32.98" y2="49.21"/><rect class="cls-2" x="27.86" y="48.53" width="10.1" height="2.47" rx="1.24" ry="1.24"/><rect class="cls-2" x="29.31" y="52.33" width="7.19" height="2.41" rx="1.2" ry="1.2"/></g><path class="cls-3" d="m37.51,30.7l-.41-.28v.49c-.02.06-.03.11-.03.17,0,0,0,0,0,0,.18.11.28.14.49.33.84.74,1.33,1.8,1.33,2.92,0,2.16-1.76,3.92-3.92,3.92-.51,0-1-.1-1.45-.28,1.14-.81,1.89-2.14,1.89-3.64,0-.23-.03-.47-.08-.77l-.04-.21h-.21s.22,0,.21,0c-.37-1.44-1.17-2.56-2.3-2.56-.84,0-1.45.61-1.96,1.47l-.1.19c-.28.6-.42,1.23-.42,1.88,0,1.5.75,2.83,1.89,3.64-.45.18-.94.28-1.45.28-2.16,0-3.92-1.76-3.92-3.92,0-1.16.31-1.82,1.08-2.71.36-.43.6-.54.77-.66,0-.04-.02-.08-.03-.13l-.06-.43-.35.24c-1.22.83-1.94,2.21-1.94,3.68,0,2.46,2,4.45,4.45,4.45.72,0,1.4-.18,2-.48.6.31,1.28.48,2,.48,2.46,0,4.45-2,4.45-4.45,0-1.44-.72-2.81-1.92-3.64Zm-6.46,3.64c0-.42.07-.84.21-1.24.37-.99,1.02-1.76,1.73-1.76.85,0,1.91,1.46,1.95,3s-.86,2.69-1.97,3.36c-1.14-.69-1.92-1.93-1.92-3.36Z"/></g></g></svg>
								<a class='p-cancel' href="#"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="darkblue"
								class="bi bi-x-circle-fill" viewBox="0 0 16 16">
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
								</svg></a>
	
								<p class="p-post-text">${data.text}</p>
								<div class="p-post-info-buttons">
						
 
                            <button class="p-show-share" style="width: 4rem; padding-left: 0.5rem;"><img src="img/svg/SVG icon/Asset 70dark.svg" alt="share"></button>
                            </div>
							
								`;

								const cancelButton = document.querySelector('.p-cancel');
								cancelButton.addEventListener('click', function() {
									document.querySelector('.p-post-container').style.visibility = "unset";
									imgContainer.innerHTML='';


								})
								
								// share a post
								const sharePost = document.querySelector('.p-show-share')
								sharePost.addEventListener('click', () => {
									sharePost.style.transition = "transform .50s ease";
									sharePost.style.transform = "rotate(360deg) ";

									const postContent = "Check out this awesome post I found!";
									const imageUrl = event.currentTarget.getAttribute('value');
									if (navigator.share) {
										// Use navigator.share() to trigger sharing
										navigator.share({
											title: "My awesome website",
											text: postContent,
											url: imageUrl,
										})
											.then(() => window.alert('Post shared successfully'))
											.catch((error) => {
												console.log(`Error sharing: ${error}`);
												// If sharing fails, fallback to AddThing
											});
									} else {
										// If navigator.share() is not supported, fallback to AddThis
										const popup = document.createElement('div');
										popup.classList.add('popup');
										popup.style.position = 'fixed';
										popup.style.top = '30%'; // set top to 10%
										popup.style.left = '50%';
										popup.style.transform = 'translateX(-50%)';
										popup.style.width = '75%'
										popup.style.display = 'flex';
										popup.style.flexFlow = 'wrap';
										popup.style.backgroundColor = "#fcebd5"
										document.body.appendChild(popup);

										//share text
										const shareText = document.createElement('p');
										shareText.innerHTML = "Share";
										shareText.style.postition = "absolute";
										shareText.style.top = "1";
										shareText.style.fontSize = "2rem";
										shareText.style.width = "80%";
										shareText.style.paddingLeft = "30%";
										shareText.style.borderBottom = "solid black 0.3rem";

										popup.appendChild(shareText);

										// Create the share links
										const facebookLink = document.createElement('a');
										facebookLink.href = `https://www.facebook.com/sharer.php?u=${imageUrl}&quote=${encodeURIComponent(postContent)}`;
										facebookLink.target = '_blank';
										facebookLink.style.margin = '1rem 2rem';
										facebookLink.style.textDecoration = "none";

										// Create the SVG element
										const fbSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

										fbSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
										fbSVG.setAttribute("width", "2.5rem");
										fbSVG.setAttribute("height", "2.5rem");
										fbSVG.setAttribute("viewBox", "0 0 1024 1024");

										const fbPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
										fbPath.setAttribute("fill", "#1877f2");
										fbPath.setAttribute("d", "M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z");

										// Append the path element to the SVG element
										fbSVG.appendChild(fbPath);

										const facebooktext = document.createElement('p');
										facebooktext.innerHTML = "facebook";
										facebooktext.style.color = "black";
										facebooktext.style.fontSize = "1rem";


										// Append the SVG element to the anchor tag
										facebookLink.appendChild(fbSVG);
										facebookLink.appendChild(facebooktext);
										popup.appendChild(facebookLink);


										const twitterLink = document.createElement('a');
										twitterLink.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(postContent)}`;
										twitterLink.target = '_blank';
										twitterLink.style.margin = '1rem 2rem';
										twitterLink.style.textDecoration = "none";

										const twitterSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
										twitterSVG.setAttribute("width", "2.5rem");
										twitterSVG.setAttribute("height", "2.5rem");
										twitterSVG.setAttribute("viewBox", "0 0 24 24");

										// create SVG path
										const twitterPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

										twitterPath.setAttribute("fill", "#1DA1F2 ");
										twitterPath.setAttribute("d", "M21.99,4.06c-.74,.33-1.54,.56-2.38,.66a4.23,4.23,0,0,0,1.84-2.34,8.46,8.46,0,0,1-2.67,1A4.21,4.21,0,0,0,14.8,2a4.16,4.16,0,0,0-4.16,4.16,4.12,4.12,0,0,0,.1,.89A11.9,11.9,0,0,1,2.21,3.06,4.12,4.12,0,0,0,3.61,8.3,4.17,4.17,0,0,1,.78,7.44v.05a4.15,4.15,0,0,0,3.32,4.07,4.25,4.25,0,0,1-1,.13,4.09,4.09,0,0,1-.79-.07,4.16,4.16,0,0,0,3.87,2.88,8.36,8.36,0,0,1-5.2,1.79A8.85,8.85,0,0,1,0,19.33a11.78,11.78,0,0,0,6.38,1.86c7.63,0,11.81-6.31,11.81-11.78,0-.18,0-.35,0-.52A8.36,8.36,0,0,0,24,4.47a8.5,8.5,0,0,1-2.05.56Z");

										// add path to SVG element
										twitterSVG.appendChild(twitterPath);

										const twittertext = document.createElement('p');
										twittertext.innerHTML = "twitter";
										twittertext.style.color = "black";
										twittertext.style.fontSize = "1rem";

										// add SVG to anchor element
										twitterLink.appendChild(twitterSVG);
										twitterLink.appendChild(twittertext);

										popup.appendChild(twitterLink);


										//share to linkedin
										const linkedinLink = document.createElement('a');
										linkedinLink.href = `https://www.linkedin.com/shareArticle?url=${imageUrl}&title=${encodeURIComponent(postContent)}`;
										linkedinLink.target = '_blank';
										linkedinLink.style.margin = '1rem 2rem';
										linkedinLink.style.textDecoration = "none";

										// Create the SVG element
										const linkedinSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

										linkedinSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
										linkedinSVG.setAttribute("width", "2.5rem");
										linkedinSVG.setAttribute("height", "2.5rem");
										linkedinSVG.setAttribute("viewBox", "0 0 24 24");

										const linkedinPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
										linkedinPath.setAttribute("fill", "#0077B5");
										linkedinPath.setAttribute("d", "M21.6,0H2.4C1.1,0,0,1.1,0,2.4v19.2C0,22.9,1.1,24,2.4,24h19.2c1.3,0,2.4-1.1,2.4-2.4V2.4C24,1.1,22.9,0,21.6,0z M7.5,19.5H3V8.6h4.5V19.5z M5.2,7.9H5c-1,0-1.6-0.7-1.6-1.4c0-0.8,0.6-1.4,1.6-1.4s1.6,0.7,1.6,1.4C6.8,7.2,6.2,7.9,5.2,7.9z M20.7,19.5h-4.5v-7c0-1.8-0.6-3-2.2-3c-1.2,0-1.9,0.8-2.2,1.6c-0.1,0.3-0.1,0.7-0.1,1.1v7.3H7.5V8.6c0-1.8,0-3.2,0-4.5h4.5v1.7c0.6-1.1,1.5-2.7,3.6-2.7c2.6,0,4.6,1.7,4.6,5.4V19.5z");



										// Append the path element to the SVG element
										linkedinSVG.appendChild(linkedinPath);

										const linkedintext = document.createElement('p');
										linkedintext.innerHTML = "Linkedin";
										linkedintext.style.color = "black";
										linkedintext.style.fontSize = "1rem";
										linkedinLink.style.textDecoration = "none";


										// Append the SVG element to the anchor tag
										linkedinLink.appendChild(linkedinSVG);
										linkedinLink.appendChild(linkedintext);

										popup.appendChild(linkedinLink);

										const instagramLink = document.createElement('a');
										instagramLink.href = `https://www.instagram.com/?url=${imageUrl}`;
										instagramLink.target = '_blank';
										instagramLink.style.margin = '1rem 2rem';
										instagramLink.style.textDecoration = "none";


										// Create the Instagram SVG icon
										const instagramSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
										instagramSVG.setAttribute("width", "2.5rem");
										instagramSVG.setAttribute("height", "2.5rem");
										instagramSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
										instagramSVG.setAttribute("viewBox", "0 0 24 24");

										const instagramPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
										instagramPath.setAttribute("d", "M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M16.7,6.9c0.9,0,1.6,0.7,1.6,1.6v7.9c0,0.9-0.7,1.6-1.6,1.6H7.3c-0.9,0-1.6-0.7-1.6-1.6V8.5c0-0.9,0.7-1.6,1.6-1.6H16.7z M12,17.5c2,0,3.5-1.5,3.5-3.5s-1.5-3.5-3.5-3.5s-3.5,1.5-3.5,3.5S10,17.5,12,17.5z M17.5,5.5c0,1.5-1.2,2.7-2.7,2.7S12,7,12,5.5s1.2-2.7,2.7-2.7S17.5,4,17.5,5.5z");
										instagramPath.setAttribute("fill", "pink");

										instagramSVG.appendChild(instagramPath);

										const instagramtext = document.createElement('p');
										instagramtext.innerHTML = "instagram";
										instagramtext.style.color = "black";
										instagramtext.style.fontSize = "1rem";

										// Append the Instagram SVG icon to the anchor tag
										instagramLink.appendChild(instagramSVG);
										instagramLink.appendChild(instagramtext);


										popup.appendChild(instagramLink);

										// Add a close button to the popup
										const closeButton = document.createElement('button');
										closeButton.style.padding = '0';
										closeButton.style.margin = '0';
										closeButton.style.marginRight = '2rem';
										closeButton.style.backgroundColor = '#fcebd5';
										closeButton.style.border = "none";
										closeButton.style.position = "absolute";
										closeButton.style.top = '1';
										closeButton.style.right = '0'


										const closesvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
										closesvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
										closesvg.setAttribute("width", "2rem");
										closesvg.setAttribute("height", "2rem");
										closesvg.setAttribute("fill", "darkblue");
										closesvg.setAttribute("viewBox", "0 0 16 16");

										const closePath = document.createElementNS("http://www.w3.org/2000/svg", "path")
										closePath.setAttribute("d", "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z")

										closesvg.appendChild(closePath);
										closeButton.appendChild(closesvg)

										closeButton.addEventListener('click', () => {
											popup.remove();
										});
										popup.appendChild(closeButton);

									}
								})



								var clickEnlarged = document.querySelector(".p-post-active");

								clickEnlarged.addEventListener("click", function () {
									document.querySelector('.p-post-container').style.visibility = "visible";
									clickEnlarged.addEventListener("click", function () {
										//imgContainer.innerHTML = "";
										//console.log(postID)
										const moveToDiscover = postID
										console.log(moveToDiscover)
										window.location.href = "../dist/discover.html?moveToDiscover=" + encodeURIComponent(moveToDiscover);
										
									})
								})


						})
					})


				})
			})
		})
	})

})






/////////////////////////code to add friend................................


const addFriend = document.querySelector(".p-add-remove")
const add_removeTEXT = document.querySelector(".p-text-add")



auth.onAuthStateChanged(function (user) {
	if (user) {
		signInEmail = auth.currentUser.email
		const getCurrentUser = query(userRef, where("Email", "==", signInEmail))
		const getCurrentUserData = getDocs(getCurrentUser)

		getCurrentUserData.then((data) => {
			const response =
				data.docs.map(d => ({ id: d.id, ...d.data() }))
			response.map(results => {
				const signedUserID = results.id
				
	if (userID==signedUserID){
		console.log("OOOOOOOOOOO")
		 window.location.href = "../dist/profile.html"
	}

				const docRef = doc(userRef, signedUserID);
				const SignedUserFriendsCollection = collection(docRef, "Friends");

				const friendsDocRef = doc(userRef, UserId);

				const addedFriend_FriendsCollection = collection(friendsDocRef, "Friends");


				const frndsID = []
				const otherfrndsID = []
				let userToadd = true;

				const r = getDocs(SignedUserFriendsCollection)
				r.then((data) => {
					const response =
						data.docs.map(d => ({ id: d.id, ...d.data() }))

					response.map(results1 => {
						frndsID.push(results1)

					})

					let signedFriendDelete;


					const g = getDocs(addedFriend_FriendsCollection)
					g.then((data) => {
						const response =
							data.docs.map(d => ({ id: d.id, ...d.data() }))

						response.map(results1 => {
							otherfrndsID.push(results1)
							

						})
					
					otherfrndsID.map((e)=>{
						console.log("EHHH")

						console.log(e)
						if (e.friendID === signedUserID) {

							signedFriendDelete = e.id
							userToadd = false
							console.log("Cannnothe user")
							console.log(e)
						}
					})


					 let signedUserFriendToDelete;
					// //array1.forEach((e1) => {
					frndsID.forEach((e) => {
						console.log(signedUserID)
						if (e.friendID === userID ){//&& e.friendID===signedUserID) {
							signedUserFriendToDelete = e.id

							console.log("Cannnot add the user")
							console.log(userID)
							userToadd = false
							add_removeTEXT.innerHTML = "Remove"
						}
					})

					console.log(frndsID)

					console.log(otherfrndsID)
					// otherfrndsID.map((e) => {
					// 	console.log(e.friendID)
					// 	console.log("KIIII")
					// 	if (e.friendID === signedUserID) {

					// 		signedFriendDelete = e.id

					// 		console.log("Cannnothe user")
					// 		console.log(e)
					// 	}
					// })
					console.log(signedFriendDelete)


					addFriend.addEventListener("click", () => {
						console.log(signedUserFriendToDelete)
						console.log(signedFriendDelete)
						addFriend.style.transition = "transform .50s ease";
						addFriend.style.transform = "rotate(360deg) ";
						if (userToadd === true) {
							addDoc(SignedUserFriendsCollection, {
								friendID: userID,
							})
							addDoc(addedFriend_FriendsCollection, {
								friendID: signedUserID,
							})
							setTimeout(() => {
								location.reload();
							}, 1000);


						}
						else {
							console.log(signedUserID)
							if ((deleteDoc(doc(db, "Users", signedUserID, "Friends", signedUserFriendToDelete))) && (deleteDoc(doc(db, "Users", userID, "Friends", signedFriendDelete)))) {
								console.log("Deleted")
								setTimeout(() => {
									location.reload();
								}, 1000);

							}
						

						}
					

					})
					console.log("user")
					console.log(signedUserID)
						// displaying the frinds
	const friendsData = getDocs(friendsCollection)
	friendsData.then((data) => {
		const data2 = data.docs.map(d => ({ id: d.id, ...d.data() })
		)
		data2.map((element) => {

			const docsUser = getDocument("Users", element.friendID)
			docsUser.then((userData) => {
				console.log(userData)
				const imageElement = document.createElement('img');
				const divElement = document.createElement('div');
				const textField = document.createElement('a');
				textField.textContent = userData.UserName
				imageElement.src = userData.ProfilePic;
				divElement.appendChild(imageElement)
				divElement.appendChild(textField)
				const otherUserDiv = document.querySelector('.p-friends-list').appendChild(divElement);


				goToUserProfile(otherUserDiv)
				
			})








		})
		// displaying the count for friends

		let numberOfFriends = document.querySelector(".p-numberOfFriends");

		getCountFromServer(friendsCollection)
			.then((snap) => {
				numberOfFriends.innerHTML = snap.data().count
			});
		// displaying the count for posts 
		let numberOfPosts = document.querySelector(".p-numberOfPosts");
		getCountFromServer(subImagesCollection1)
			.then((snap) => {
				numberOfPosts.innerHTML = snap.data().count
			});


	});
					function goToUserProfile(element) {
						element.addEventListener("click", e => {
							const clickedUserName = e.target.innerHTML
							console.log("GOTOUSER")
							const postData = query(userRef, where("UserName", "==", clickedUserName))
							const p = getDocs(postData)
							p.then((data) => {
								const response =
									data.docs.map(d => ({ id: d.id, ...d.data() }))
								response.map(results => {
									moveTouser = results.id
									if (moveTouser==signedUserID){
										console.log("OOOOOOOOOOO")
										window.location.href = "../dist/profile.html"

									}
									else{
										window.location.href = "../dist/redirectToProfile.html?moveTouser=" + encodeURIComponent(moveTouser)

									}
											
					
								})
							})
						})
					}
				})
			})

			}

			)
		})
	}
	
})



async function getDocument(coll, id) {
	const snap = await getDoc(doc(db, coll, id))

	return snap.data()
}

})
