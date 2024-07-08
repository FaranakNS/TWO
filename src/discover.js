// // import { getFirestore  } from 'firebase/firestore';
// // import { getAuth } from "firebase/auth";
// import firebase, { initializeApp } from "firebase/app";
// import  {
//   getFirestore, collection, getDocs, addDoc, 
//   deleteDoc, doc, onSnapshot, query, where, getDoc, setDoc,runTransaction
// } from 'firebase/firestore';

// import { signOut } from "firebase/auth";


// // import firebase from 'firebase/compat/app';
// //import { collection, getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// import { getDownloadURL, getStorage, ref, uploadBytesResumable, userCredential } from "firebase/storage";



// const firebaseConfig = {
//   // Your Firebase configuration object here
//   // Your web app's Firebase configuration

//   apiKey: "AIzaSyBxzRkwIxW8qEZFubLc_qVIY4IshFS9HCQ",
//   authDomain: "the-world-s-opinion-e6dac.firebaseapp.com",
//   databaseURL: "https://the-world-s-opinion-e6dac-default-rtdb.firebaseio.com",
//   projectId: "the-world-s-opinion-e6dac",
//   storageBucket: "the-world-s-opinion-e6dac.appspot.com",
//   messagingSenderId: "514208223527",
//   appId: "1:514208223527:web:4fe7598ef068908f73d902",
//   storageBucket: "the-world-s-opinion-e6dac.appspot.com"

// };

// // if (typeof firebase !== 'undefined') {
// //   console.log('hey surprise')
// //   //const app = firebase.initializeApp(firebaseConfig);
  
// // } else {
// //   console.log('Firebase SDK is not loaded');
// // }

// // if (firebase && firebase.auth()) {
// //   console.log('here')
// // } else {
// //   console.log('Firebase Auth is not initialized');
// // }

// initializeApp(firebaseConfig);

// // Initialize authorization
// const auth = getAuth();

// // Get the Firestore database
// const db = getFirestore();

// const imagesRef =collection(db, "ImageLinks")

// function GetImagesFromFirestore() {
//   return new Promise(async function(resolve, reject) {
//     try {
//     var imageUrls = [];
//     var postIds = [];
//     const querySnapshot = await getDocs((imagesRef));
//     querySnapshot.forEach((doc) => {
//       if (doc.exists()) {
//       imageUrls.push(doc.data().ImageUrl);
//       postIds.push(doc.id)
      
//       // console.log(doc.id)
//       // console.log(doc.data().ImageUrl)	
//       }
//     });
//     // const imageUrl = querySnapshot.docs[0].data().ImageUrl;
//     // console.log(imageUrl)
//     const imageList = document.querySelector(".d-show-posts")
//     imageList.addEventListener("click", (e)=>{
//      // e.preventDefault();
//       //console.log(e)
//       //console.log(e.target.src)
//       const imageSrc = e.target.src;
//       console.log(imageSrc);
//       // const querySnapshot1 =  getDocs(query(imagesRef,where('ImageUrl', '==', imageSrc)));
//       // querySnapshot1.then((g) => {
//       //   console.log(g)
//       //   const data2=g.docs.map(d=>({id:d.id, ...d.data()}))
//       //   console.log(data2)
//       //   data2.map((fr) => {
//       //     //console.log(fr.id)
//       //     const imageId = fr.id;
//       //     console.log("imageid")
//       //     console.log(imageId);
//       //   })    
//       //})
//       const buttons = document.querySelectorAll(".d-svg-like");
//       buttons.forEach((button) => {
//         button.addEventListener("click", (g) => {
//           const postId = g.currentTarget.getAttribute('value');
//           console.log(postId); 
//         });
//       })
//       // docId.addEventListener("click", async (event) => {
//       //   //console.log(event)
//       //     console.log(event.target)
//       //     const postUrl = imageSrc;
//       //     const querySnapshot =  getDocs(
//       //       query(imagesRef, where('ImageUrl', '==', postUrl))
//       //     );
//       //     const docId1 = querySnapshot.docs[0].data().id;
//       //     console.log(docId1)
//       //     const docRef =  doc(imagesRef, docId1);
//       //     const docSnap = await getDoc(docRef);
//       //     if (docSnap.exists()) {
//       //       const data = docSnap.data();
//       //       if (data.like_count == 0) {
//       //         await updateDoc(docRef, {
//       //           like: true,
//       //           dislike: false,
//       //           like_count: 1,
//       //           dislike_count: 0
//       //         });
//       //       } else {
//       //         await updateDoc(docRef, {
//       //           like: false,
//       //           dislike: false,
//       //           like_count: 0,
//       //           dislike_count: 0
//       //         });
//       //       }	
//       //      updateButton(data);
//       //     }
//       // }); 
//     })
//     imageList.innerHTML =
//       `<div class="d-display-on-post">` +
//       imageUrls.map(function(imageUrl) {  
//         const index = imageUrls.indexOf(imageUrl);
//         const postId = postIds[index]
//         console.log(imageUrl)
//       return `
//         <ul class="d-li-img">
//         <li><img src="${imageUrl}"></li>
//         </ul>

//         <div class="d-reaction-icons">
//         <ul class="d-reaction-list">
//           <li class="d-svg-share"><button class="post-button-share"><i class="fa-solid fa-share"></i></button></li>
//           <li class="d-svg-trash"><button class="post-button-delete"><i class="fa-solid fa-trash"></i></button></li>
//           <li class="d-svg-like"><button class="post-button-like" value="${postId}"><i class="fa-solid fa-thumbs-up"></i></button></li>
//           <li class="d-svg-dislike"><button class="post-button-dislike"><i class="fa-solid fa-thumbs-down"></i></button></li>

//         </ul>
//         </div>
//         <div class="d-userPosted">
//         <ul>
//           <li>
//           <button>
//             <a href="../Designing/profile.html"><img src="img/wallpaperflare.com_wallpaper (6).jpg" alt="profile-picture"></a>
//           </button>
//           </li>
//           <li>
//           <button>
//             <p>UserName</p>
//           </button>
//           </li>
//           <li>
//           <button>
//             <p>Date</p>
//           </button>
//           </li>
//         </ul>
//         </div>`
//       }).join('') +
//       `</div>`;
//     resolve(imageUrls);
//     } catch (error) {
//     reject(error);
//     }
//   });
//   }
//   GetImagesFromFirestore();


