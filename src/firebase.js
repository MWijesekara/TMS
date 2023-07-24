// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwQm5IZw3nwb915rKp6H62TJxPlgS6czM",
    authDomain: "sampleproject-fc08e.firebaseapp.com",
    projectId: "sampleproject-fc08e",
    storageBucket: "sampleproject-fc08e.appspot.com",
    messagingSenderId: "246756226628",
    appId: "1:246756226628:web:f67f219714ab25240a6e11"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
