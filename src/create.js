var button = document.querySelector(".c-done");


//importing firebase/database config

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc,onSnapshot,getDocs,setDoc,doc,query,where,collection,updateDoc, QuerySnapshot, setDocs, Firestore } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable,getStorage,downloadURL, uploadBytes } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

initializeApp(firebaseConfig)
const db = getFirestore();
const userRef = collection(db, "Users")
const imagesRef=collection(db, "Images")
const storage=getStorage();

let UserId;
let signInEmail;
 
//firebase authenthication
const auth=getAuth();
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("user id")
    console.log(auth.currentUser.email)
    signInEmail = auth.currentUser.email
    // UserId=auth.currentUser.uid
  }else
  {
    console.log('No user is signed in.')
  }

  const getCurrentUser = query(userRef, where("Email", "==", signInEmail))
  const getCurrentUserData = getDocs(getCurrentUser)
  getCurrentUserData.then((data) => {
    const response =
    data.docs.map(d => ({ id: d.id, ...d.data() }))
    response.map(results => {
    console.log("results")
    console.log(results.id)
    UserId = results.id
    
    });
  })
})


//Calling the Access the gallery functionality:

 var gallery = document.querySelector('.c-accessgallery');
 var cancel = document.querySelector('.c-cancel');
 var addButton = document.querySelector('.c-splitscreen');
 
  gallery.addEventListener('click', function() {
    galleryaccessed();
    gallery.disabled = true;

  });

//Cancel button functionality
   
  cancel.addEventListener('click', function() {
    var container = document.querySelector('.c-image-display');
    var containertext = document.querySelector('.text-container');
    gallery.disabled=false;

    container.innerHTML = '';
    containertext.innerHTML = '';
    });

//creating URL for different screens
  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
    }
      return new Blob([u8arr], {type:mime});
    }
      
// function to access the device gallery & fetch the userid and upload the file (img/video) to firebase under particular userid.
  function galleryaccessed() {

    // check if the browser can get the File API
      if (window.File && window.FileReader && window.FileList && window.Blob) {
    // create a new file input element
      var input = document.createElement('input');
      input.type = 'file';
    // add an event listener to the file input element
      input.addEventListener('change', function(e) {
      e.preventDefault(); 
        // Display the file
          for (var i = 0; i < input.files.length; i++) {
          var file = input.files[i];
          if (file.type.startsWith('video/')) {
            var video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            //display the video
            video.width = 500;
            video.height = 700;
            console.log('your video is displaying')
        // add the video element to the gallery container
          const container = document.querySelector('.c-image-display');
          container.appendChild(video);
           }else if(file.type.startsWith('image/')) 
            {
           var image = document.createElement('img');
           image.src = URL.createObjectURL(file);
        // add the image element to the gallery container
          const container = document.querySelector('.c-image-display');
          if (container.children.length > 0) {
          alert('You can only choose one image.');
          } else {
        // add the image element to the gallery container
          container.appendChild(image);
          console.log('your image is displaying')
         
          }
         }
         const uploadFile = (file, isVideo) => {
          const name = new Date().getTime() + file.name;
          console.log(name);
          const storagePath = isVideo ? "Videos/" + file.name : "Images/" + file.name;
          const fileRef = ref(storage, storagePath);
          const uploadTask = uploadBytesResumable(fileRef, file);
        
          // rest of the function code
        };
        
         
            

// upload the edited image to storage
button.addEventListener('click', event =>
{
  const uploadFile = () => {
    const name = new Date().getTime() + file.name
    console.log(name)
    const fileRef = ref(storage, "Images/" + file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error)
      },() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          const userRef = collection(db, "Users");
          const postRef = collection(db, "Posts");
          // Generate a custom ID for the post
          const postId = generateId();
          const userDocRef = doc(userRef, UserId);
          const postUserDocRef = doc(postRef, UserId);
          // create a new post document in the "Posts" subcollection
          const imagesRef = collection(userDocRef, "Posts");
          const imagesInfo = doc(imagesRef);
          const imagesDocRef = doc(imagesRef, postId);
          // set & update the docs
          var postid;
          addDoc(postRef, {
            UserId: UserId,
            ImageUrl: downloadURL,
            postId: postId,
            text: textValue,
            Date: new Date().toLocaleDateString(),
            createdAt: new Date().toLocaleString("en-US", { hour12: true }),
          })
          .then((newDocRef) =>{
            console.log("Doc id: ",newDocRef.id)
            postid=newDocRef.id;
            setDoc(imagesDocRef, {
              UserId: UserId,
              ImageUrl: downloadURL,
                 text: textValue
            });
          })
          .then(() => {
            console.log('then run')
            window.location.href='../dist/profile.html'
          });
        })
       
       
      })
    }


    file && uploadFile()
  })
  

}
}),
input.click();
}else{
alert('Your browser does not support the File API');
}



}


// // upload the edited image to storage
// button.addEventListener('click', event =>
// {
//   const uploadFile = () => {
//     const name = new Date().getTime() + file.name
//     console.log(name)
//     const fileRef = ref(storage, "Images/" + file.name);
//     const uploadTask = uploadBytesResumable(fileRef, file);
  
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("upload is paused");
//             break;
//           case "running":
//             console.log("upload is running");
//             break;
//           default:
//             break;
//         }
//       },
//       (error) => {
//         console.log(error)
//       },() => {
//         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           console.log('File available at', downloadURL);
//           const userRef = collection(db, "Users");
//           const postRef = collection(db, "Posts");
//           // Generate a custom ID for the post
//           const postId = generateId();
//           const userDocRef = doc(userRef, UserId);
//           const postUserDocRef = doc(postRef, UserId);
//           // create a new post document in the "Posts" subcollection
//           const imagesRef = collection(userDocRef, "Posts");
//           const imagesInfo = doc(imagesRef);
//           const imagesDocRef = doc(imagesRef, postId);
//           // set & update the docs
//           var postid;
//           addDoc(postRef, {
//             UserId: UserId,
//             ImageUrl: downloadURL,
//             postId: postId,
//             text: textValue,
//             Date: new Date().toLocaleDateString(),
//             createdAt: new Date().toLocaleString("en-US", { hour12: true }),
//           })
//           .then((newDocRef) =>{
//             console.log("Doc id: ",newDocRef.id)
//             postid=newDocRef.id;
//             setDoc(imagesDocRef, {
//               UserId: UserId,
//               ImageUrl: downloadURL
//             });
//           });
//         })
//       })
//     }
//     file && uploadFile()
//   })
// }
// }),
// input.click();
// }else{
// alert('Your browser does not support the File API');
// }



// }


// Function to generate a custom ID for the post
    function generateId() {
  // Generate a random string of characters for the ID
     const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
     let id = '';
     for (let i = 0; i < 10; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
  return id;
}

    
//Live stream camera and rotation
  const cameraContainer = document.querySelector('.c-image-display');
  const captureButton = document.querySelector('.c-cameraclick');
  const rotateButton = document.querySelector('.c-camerarotate');
  const videoOptions = { video: true, audio: true }; // Add audio constraint

  let mediaRecorder = null;
  let recordedChunks = [];
  let isFlipped = false;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    cameraContainer.appendChild(video);
  })
  .catch(error => {
    console.error('Error accessing camera:', error);
  });

  //Flip Camera
    rotateButton.addEventListener('click', () => {
    isFlipped = !isFlipped;
    navigator.mediaDevices.getUserMedia({
      video: {
      facingMode: isFlipped ? "user" : "environment"
        }
      })
      .then(stream => {
        const video = document.querySelector('video');
        video.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  });
  
  
//Add an event listener to a "captureButton" element that triggers when the button is clicked.
  captureButton.addEventListener('click', () => {
  //Create a canvas element with the same dimensions as the camera container.
    const canvas = document.createElement('canvas');
    canvas.width = cameraContainer.offsetWidth;
    canvas.height = cameraContainer.offsetHeight;
    const video = document.querySelector('video');
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  //Convert the canvas to a data URL and create an Image element with that URL as the source.
    const imageFile = canvas.toDataURL('');
    const image = new Image();
    image.style.width = '100%';
    image.style.height = '100%';
    image.src = imageFile;
  // Replace the contents of the camera container with the Image element.
    cameraContainer.innerHTML = '';
    cameraContainer.appendChild(image);
    console.log("Photo taken");
    const blob = dataURLToBlob(imageFile);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function() {
    const base64data = reader.result;
    console.log("Base64 data:", imageFile);
  }; 
  //submit to firebase button
  button.addEventListener("click", event => {
  uploadLiveCameraToFirebase(blob);
  });
});


// Add an event listener to a "rotateButton" element that triggers when the button is clicked.
  rotateButton.addEventListener('click', () => {
  const video = document.querySelector('video');
  if (!isFlipped) {
    video.style.transform = 'scaleX(-1)';
    } else {
    video.style.transform = 'none';
    }
    isFlipped = !isFlipped;
});


//This function is uploading the livecamera post into firebase
function uploadLiveCameraToFirebase(imageFile) {
  console.log(imageFile);
  const uploadFile = () => {
  const name = new Date().getTime() + '.png';
  const fileRef = ref(storage, 'Images/' + name);
  const uploadTask = uploadBytesResumable(fileRef, imageFile);
   uploadTask.on(
     'state_changed',
     (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
     },
     (error) => {
       console.log(error)
     },
     () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('hi this is working')
         const userRef = collection(db, "Users")
         const postRef = collection(db, "Posts")

                           // Generate a custom ID for the post
                           const postId = generateId();
                           const userDocRef = doc(userRef, UserId);
                           const postUserDocRef = doc(postRef, UserId);
                           const imagesRef = collection(userDocRef, "Posts");
                           const imagesInfo = doc(imagesRef);
                           const imagesDocRef = doc(imagesRef, postId);
             
                           // set & update the docs
                            var postid;
                            addDoc(postRef, {
                              UserId: UserId,
                              ImageUrl: downloadURL,
                              postId: postId,
                              text: textValue,
                              Date: new Date().toLocaleDateString(),
                              createdAt: new Date().toLocaleString("en-US", { hour12: true })
                            })
                          .then((newDocRef) =>{
                            console.log("Doc id: ",newDocRef.id)
                            postid=newDocRef.id;
                            setDoc(imagesDocRef, {
                              UserId: UserId,
                              ImageUrl: downloadURL,
                                 text: textValue,
                            });
                          
                        })
                        .then(() => {
                          console.log('then run')
                          window.location.href='../dist/profile.html'
                        });
              console.log('Image saved to Firebase:', downloadURL);
         
               })
               
             }
          )
        }
   uploadFile()
    alert("YOU USE LIVE CAMERA and Your File Submitted Successfully!");
  }


//Splitscreen Functionality

    // Get references to the button and image container elements
    const imageContainer = document.querySelector('.c-image-display');
    // Define variables to store the selected images
    let image1 = null;
    let image2 = null;
    // Add a boolean variable to track if split is done
    let isSplit = false;
    // Add a click event listener to the button to trigger the image selection process
    addButton.addEventListener('click', () => {
    // Check if the user has already selected two images
    if (image1 !== null && image2 !== null) {
      alert('You have already selected two images');
      return;
      }
// Create an input element to select images from the gallery
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

// Add an event listener to the input to handle image selection
    input.addEventListener('change', () => {
    // Loop through the selected files and display them
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.style.maxWidth = '50%';
      image.style.height = '100vh';
      image.style.marginBottom = '10px';

      // Display the first image
        if (image1 === null) {
          image1 = image;
          imageContainer.appendChild(image1);
        }
        // Display the second image next to the first image
        else if (image2 === null) {
          image2 = image;
          image2.addEventListener('load', () => {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.width = '100%';
            container.style.height = '100%';
            container.appendChild(image1);
            container.appendChild(image2);
            imageContainer.innerHTML = '';
            imageContainer.appendChild(container);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image1.width + image2.width + .5; // Add 10 pixels for margin
            canvas.height = Math.max(image1.height, image2.height);
            // Draw the first image on the left half of the canvas with 50% width
            context.drawImage(image1, 0, 0, canvas.width / 2, canvas.height);
            // Draw the second image on the right half of the canvas with 50% width
            context.drawImage(image2, canvas.width / 2 + .5, 0, canvas.width / 2, canvas.height);
            canvas.style.width= '500'
            canvas.style.height= '700'
            const dataURL = canvas.toDataURL('image/jpg');
            const blob = dataURLToBlob(dataURL);
            button.addEventListener("click", event => {
              uploadToFirebase(blob);
            })
            addButton.disabled = true;
             // Set isSplit to true after split is done
             isSplit = true;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  });
  // Trigger the input click event to open the gallery
  input.click();
});


//Upload splitscreen to firebase
  function uploadToFirebase(dataURL, description) {
  console.log(dataURL);
  const uploadFile = () => {
  const name = new Date().getTime() + '.png';
  const fileRef = ref(storage, 'Images/' + name);
  const uploadTask = uploadBytesResumable(fileRef, dataURL);
   uploadTask.on(
     'state_changed',
     (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
     },
       (error) => {
       console.log(error)
      },
      () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         const userRef = collection(db, "Users")
         const postRef = collection(db, "Posts")
          // Generate a custom ID for the post
           const postId = generateId();
           const userDocRef = doc(userRef, UserId);
           const postUserDocRef = doc(postRef, UserId);
           const imagesRef = collection(userDocRef, "Posts");
           const imagesInfo = doc(imagesRef);
           const imagesDocRef = doc(imagesRef, postId);
        // set & update the docs
             var postid;
             addDoc(postRef, {
               UserId: UserId,
               ImageUrl: downloadURL,
               postId: postId,
               text: textValue,
               split: true,
               Date: new Date().toLocaleDateString(),
               createdAt: new Date().toLocaleString("en-US", { hour12: true })
             })
             .then((newDocRef) =>{
               console.log("Doc id: ",newDocRef.id)
               postid=newDocRef.id;
               setDoc(imagesDocRef, {
                 UserId: UserId,
                 ImageUrl: downloadURL,
                 text: textValue
               });
              
             })
             .then(() => {
              console.log('then run')
              window.location.href='../dist/profile.html'
            });
         console.log('Image saved to Firebase:', downloadURL);
       })
       
     }
   )
 }
  uploadFile()
  alert("You use the SplitScreen and Your File Submitted Successfully!");
}

//Adding text 
  const addTextButton =document.querySelector(".c-text");
  const textContainer =document.querySelector(".text-container");
  var textValue="";
  //Add a click event listener to the 
  addTextButton.addEventListener('click', () => {
  // Set the text content of the paragraph element 
  console.log("clicked");
  textContainer.innerHTML=`<input type="text" class="ctextinput" id="ctextinput" name="ctextinput">
  <button class="c-submit" type="submit"></button> `;
  // textContainer.textContent = 'This text was added by clicking the button!';
  var form=document.querySelector(".c-form");
  textContainer.addEventListener("submit", (event)=> 
   { event.preventDefault();
    console.log('text entered');
    textValue=textContainer.ctextinput.value; 
    console.log(textValue); 
    textContainer.innerHTML= textValue;
})});