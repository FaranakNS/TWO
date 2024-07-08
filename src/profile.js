//imports

import { initializeApp } from "firebase/app";
import { getDocs, setDoc, doc, getFirestore, querySnapshot, onSnapshot, query, where, collection, getDoc, updateDoc, addDoc, getCountFromServer, deleteDoc, length } from 'firebase/firestore';
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
console.log(userRef)
const postRef = collection(db, "Posts")

const storage = getStorage();

let moveTouser;



let Name;
let UserName;
let ProfilePic;
let UserId;

auth.onAuthStateChanged(function (user) {
	if (user) {
		signInEmail = auth.currentUser.email
		console.log(signInEmail)

	}

	// accessing the data of current user
	const getCurrentUser = query(userRef, where("Email", "==", signInEmail))


	const getCurrentUserData = getDocs(getCurrentUser)

	getCurrentUserData.then((data) => {
		const response =
			data.docs.map(d => ({ id: d.id, ...d.data() }))
			console.log(response)

		response.map(results => {

			Name = results.FullName;
			UserName = results.UserName;
			ProfilePic = results.ProfilePic
			UserId = results.id
		});
		// display name
		console.log(UserId)
		let name = document.querySelector(".p-fullname");
		name.innerHTML = Name;

		//displey username
		let username = document.querySelector(".p-username")
		username.innerHTML = UserName

		let profilePic = document.querySelector(".p-profile-display")
		// change profile pic
		profilePic.src = ProfilePic;

		// accesing the images inside the users
		const usercollection = doc(userRef, UserId)
		const subImagesCollection1 = collection(usercollection, "Posts")


		const friendsCollection = collection(usercollection, "Friends")


		//const postsCount=collection()
		const imagesData = getDocs(subImagesCollection1)
		let postID;
		imagesData.then((data) => {
			const data2 = data.docs.map(d => ({ id: d.id, ...d.data() })
			)

			data2.map((e) => {
				// console.log(e)
				const postSubcollection = query(postRef, where("postId", "==", e.id))
				const resultsData = getDocs(postSubcollection)
				// console.log(resultsData)
				
				const fileExtension = e.ImageUrl.split('.').pop().toLowerCase();
				const fileExtension2 = fileExtension.split('.').pop().toLowerCase();
				console.log(fileExtension2) 
				
				let imageElement;
				if (fileExtension2.startsWith('mp4') ){
					imageElement = document.createElement('video');

				  } 
				else{
					imageElement = document.createElement('img');
				}
				// const imageElement = document.createElement('img');
				imageElement.src = e.ImageUrl;
				
				const divPOST = document.createElement("div")
				divPOST.appendChild(imageElement)


				//console.log(element)
				resultsData.then((data) => {
					const response =

						data.docs.map(d => ({ id: d.id, ...d.data() }))
					// console.log(data)
					response.map((results) => {
						postID = results.id
						// console.log("res")
						// console.log(results)
						const text = document.createElement("p")
						text.innerHTML = results.text
						if(text.textContent.length>10){
							console.log("JIIIIIIIIIIIIIIIIIIIIIIIIII")
							text.style.fontSize = "0.25rem";
							text.width = '100%'
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
								console.log("data")

								 console.log(data)
								 const split=data.split
								 

								
								let imgContainer = document.querySelector('.p-clickedpost-container');

								if((data.ImageUrl.split('.').pop().toLowerCase().split('.').pop().toLowerCase()).startsWith('mp4')){
									console.log('video')
									imgContainer.innerHTML = `		
										<video autoplay class="p-post-active" src="${data.ImageUrl}" alt="img" title="image">`
								}
								else{
									console.log('img')
									imgContainer.innerHTML = `		
									<img class="p-post-active" src="${data.ImageUrl}" alt="img" title="image">`
								}
								imgContainer.innerHTML += `		
							
							<svg class="p-two-logo" id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.81 65.81"><defs><style>.cls-1{fill:#fdce8d;}.cls-2,.cls-3{fill:#fff;}.cls-4{fill:#194789;}.cls-5{fill:none;}.cls-5,.cls-3{stroke-linecap:round;}.cls-5,.cls-3,.cls-6{stroke:#fff;stroke-miterlimit:10;}.cls-3{stroke-width:.75px;}.cls-6{fill:#f7961d;stroke-width:3px;}</style></defs><g id="Layer_1-2"><g><g><rect class="cls-4" width="65.81" height="65.81" rx="12" ry="12"/><circle class="cls-6" cx="32.91" cy="28.19" r="16.73"/><circle class="cls-1" cx="32.91" cy="32.41" r="10.37"/><line class="cls-5" x1="25.83" y1="38.25" x2="39.99" y2="38.25"/><line class="cls-5" x1="32.84" y1="38.95" x2="32.98" y2="49.21"/><rect class="cls-2" x="27.86" y="48.53" width="10.1" height="2.47" rx="1.24" ry="1.24"/><rect class="cls-2" x="29.31" y="52.33" width="7.19" height="2.41" rx="1.2" ry="1.2"/></g><path class="cls-3" d="m37.51,30.7l-.41-.28v.49c-.02.06-.03.11-.03.17,0,0,0,0,0,0,.18.11.28.14.49.33.84.74,1.33,1.8,1.33,2.92,0,2.16-1.76,3.92-3.92,3.92-.51,0-1-.1-1.45-.28,1.14-.81,1.89-2.14,1.89-3.64,0-.23-.03-.47-.08-.77l-.04-.21h-.21s.22,0,.21,0c-.37-1.44-1.17-2.56-2.3-2.56-.84,0-1.45.61-1.96,1.47l-.1.19c-.28.6-.42,1.23-.42,1.88,0,1.5.75,2.83,1.89,3.64-.45.18-.94.28-1.45.28-2.16,0-3.92-1.76-3.92-3.92,0-1.16.31-1.82,1.08-2.71.36-.43.6-.54.77-.66,0-.04-.02-.08-.03-.13l-.06-.43-.35.24c-1.22.83-1.94,2.21-1.94,3.68,0,2.46,2,4.45,4.45,4.45.72,0,1.4-.18,2-.48.6.31,1.28.48,2,.48,2.46,0,4.45-2,4.45-4.45,0-1.44-.72-2.81-1.92-3.64Zm-6.46,3.64c0-.42.07-.84.21-1.24.37-.99,1.02-1.76,1.73-1.76.85,0,1.91,1.46,1.95,3s-.86,2.69-1.97,3.36c-1.14-.69-1.92-1.93-1.92-3.36Z"/></g></g></svg>
							<a class='p-cancel' href="#"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="darkblue"
							class="bi bi-x-circle-fill" viewBox="0 0 16 16">
							<path
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
							</svg></a>
							<p class="p-post-text">${data.text}</p>
							<div class="p-post-info-buttons">
                            <button class="p-show-results">
                            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.06 41.87"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:#94b6df;}.cls-3{fill:#fdce8d;}.cls-4{fill:#194789;}</style></defs><g id="Group_154"><path id="Path_182" class="cls-4" d="m26.05,41.87H7.21c-3.98,0-7.21-3.32-7.21-7.4V10.7C0,6.61,3.23,3.3,7.21,3.29h18.83c3.98,0,7.21,3.32,7.21,7.4v23.76c0,4.09-3.23,7.4-7.21,7.4M7.21,7.21c-1.87,0-3.39,1.56-3.4,3.48v23.76c0,1.93,1.52,3.49,3.4,3.49h18.83c1.88,0,3.4-1.56,3.4-3.49V10.7c0-1.93-1.52-3.49-3.4-3.49H7.21Z"/><path id="Path_183" class="cls-4" d="m7.24,17.51c-1.05-.02-1.89-.91-1.87-1.99.02-1.05.84-1.89,1.86-1.92l16.06-.13h.02c1.05,0,1.91.87,1.92,1.95,0,1.08-.85,1.96-1.9,1.97h0l-16.06.13h-.02Z"/><path id="Path_184" class="cls-4" d="m7.25,25.58c-1.05-.02-1.89-.91-1.87-1.99.02-1.05.84-1.89,1.86-1.92l16.06-.13h.01c1.05,0,1.91.87,1.92,1.95,0,1.08-.85,1.96-1.9,1.97l-16.06.13h-.02Z"/><path id="Path_185" class="cls-4" d="m7.26,33.66c-1.05-.02-1.89-.91-1.87-1.99.02-1.05.84-1.89,1.86-1.92l16.06-.13h.01c1.05,0,1.91.87,1.92,1.95,0,1.08-.85,1.96-1.9,1.97l-16.06.13h-.02Z"/><path id="Path_186" class="cls-4" d="m37.81,11.57c-.29,6.68-5.8,11.85-12.31,11.55-6.1-.28-10.98-5.29-11.26-11.55C14.53,4.89,20.05-.29,26.56.01c6.1.28,10.98,5.29,11.26,11.55"/><path id="Path_187" class="cls-1" d="m35.9,11.57c-.2,5.6-4.78,9.97-10.24,9.76-5.17-.2-9.32-4.45-9.51-9.76.2-5.6,4.78-9.97,10.24-9.76,5.17.2,9.32,4.45,9.51,9.76"/><path id="Path_188" class="cls-2" d="m34.23,11.57c-.2,4.65-4.03,8.25-8.55,8.05-4.25-.19-7.66-3.69-7.84-8.05.2-4.65,4.03-8.25,8.55-8.05,4.25.19,7.66,3.69,7.84,8.05"/><path id="Path_189" class="cls-4" d="m41.72,27.09h0c-.46.47-1.19.47-1.65,0l-6.83-7.01c-.46-.47-.46-1.22,0-1.69.46-.47,1.19-.47,1.65,0h0l6.83,7.01c.45.47.45,1.22,0,1.69"/><path id="Path_190" class="cls-3" d="m25.4,16.38l-3.83-4.31c-.46-.49-.44-1.26.04-1.73.48-.47,1.23-.45,1.69.04.01.01.03.03.04.04l2.08,2.34,4.64-5.17c.43-.51,1.19-.56,1.68-.11.49.45.54,1.22.11,1.73-.01.01-.02.03-.04.04l-6.41,7.14Z"/></g></svg></button>
							
							
							<button class="p-show-delete"><svg fill="#194789" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
								width="800px" height="800px" viewBox="0 0 482.428 482.429"
								xml:space="preserve">
							<g>
								<g>
									<path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
										c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
										h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
										C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
										C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
										c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
										c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
										V115.744z"/>
									<path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
										c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
									<path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
										c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
									<path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
										c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
								</g>
							</g>
							</svg></button>
 
                            <button class="p-show-share"><img src="img/svg/SVG icon/Asset 70dark.svg" alt="share"></button>
                            </div>
							<div class="p-results p-hidden">
								<p class="p-results-heading">Results</p>
								<button class="p-cross-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkblue"
								class="bi bi-x-circle-fill p-crossButton" viewBox="0 0 16 16">
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
							</svg></button>
							<div class="p-results-value">
							${split ? `
							<div>
								<p>A count</p>
								<p>${data.A_count}</p>
							</div>
							<div>
								<p>B count</p>
								<p>${data.B_count}</p>
								</div>
								
							</div>`
							:
							`<div>
							<p>likes</p>
							<p>${data.like_count}</p>
						</div>
						<div>
							<p>dislikes</p>
							<p>${data.dislike_count}</p>
							</div>
							
						</div>`
							}
				
							<p>Date Posted:</p>
							<p>${data.createdAt}</p>
					
							</div>
                            `;
								const infobuttons = document.querySelector('.p-post-info-buttons');

								const resultsButton = document.querySelector('.p-show-results');

								const resultsContainer = document.querySelector('.p-results');

								resultsButton.addEventListener("click", button => {
									resultsButton.style.transition = "transform .50s ease";
									resultsButton.style.transform = "rotate(360deg) ";
									infobuttons.classList.toggle("p-hidden");
									resultsContainer.classList.toggle("p-hidden");

								});

								const cancelButton = document.querySelector('.p-cancel');
								cancelButton.addEventListener('click', function() {
									document.querySelector('.p-post-container').style.visibility = "unset";
									imgContainer.innerHTML='';


								})

								const crossButton = document.querySelector('.p-cross-button');


								crossButton.addEventListener("click", function () {
									infobuttons.classList.toggle("p-hidden");
									resultsContainer.classList.toggle("p-hidden");

								});
								const deletePost = document.querySelector(".p-show-delete")
								deletePost.style.transition = "transform .50s ease";
								deletePost.style.transform = "rotate(360deg) ";
								console.log(postID)
								deletePost.addEventListener("click", () => {
									if (confirm("Are you sure you want to delete the post")) {

										(deleteDoc(doc(db, "Users", UserId, "Posts", e.id))) && (deleteDoc(doc(db, "Posts", postID)))

										// console.log("done")
										alert("Post Deleted")

										imgContainer.innerHTML = "";
										setTimeout(() => {
											location.reload();
										}, 1000);

									}
									else {

									}


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
												// console.log(`Error sharing: ${error}`);
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



								// <div class="p-results">
								// 	<p class="p-results-heading">Results</p>
								// <div class="p-results-value">
								// <div>
								// 	<p>likes</p>
								// 	<p>${data.like_count}</p>
								// </div>
								// <div>
								// 	<p>dislikes</p>
								// 	<p>${data.dislike_count}</p>
								// 	</div>

								// </div>

								// <p>Date Posted:</p>
								// <p></p>

								// </div>

								var clickEnlarged = document.querySelector(".p-post-active");

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


			// displaying the frinds
			const friendsData = getDocs(friendsCollection)
			friendsData.then((data) => {
				const data2 = data.docs.map(d => ({ id: d.id, ...d.data() })
				)
				data2.map((element) => {

					const docsUser = getDocument("Users", element.friendID)
					docsUser.then((userData) => {

						const imageElement = document.createElement('img');
						const divElement = document.createElement('div');
						const textField = document.createElement('a');
						textField.textContent = userData.UserName
						imageElement.src = userData.ProfilePic;
						divElement.appendChild(imageElement)
						divElement.appendChild(textField)
						const otherUserDiv = document.querySelector('.p-friends-list').appendChild(divElement);


						goToUserProfile(otherUserDiv)
						function goToUserProfile(element) {
							element.addEventListener("click", e => {

								const clickedUserName = e.target.innerHTML

								const postData = query(userRef, where("UserName", "==", clickedUserName))
								const p = getDocs(postData)
								p.then((data) => {
									const response =
										data.docs.map(d => ({ id: d.id, ...d.data() }))

									response.map(results => {
										moveTouser = results.id
										
										window.location.href = "../dist/redirectToProfile.html?moveTouser=" + encodeURIComponent(moveTouser)

									})
								})
							})
						}
					})




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
			//changing profile pic
			profilePic.addEventListener("click", () => {

				galleryaccessed()
			});

		});
	})





})



// accessing gallery
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


				const container = document.querySelector(".p-profile-display")
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

								const docRef = doc(userRef, UserId);

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

async function getDocument(coll, id) {
	const snap = await getDoc(doc(db, coll, id))


	return snap.data()
}