// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: any = {
  apiKey: "AIzaSyAYWPJYb1TT6_E7CHyKZ2vmA1Qu6lBGsbc",
  authDomain: "netflixgpt-3aa8b.firebaseapp.com",
  projectId: "netflixgpt-3aa8b",
  storageBucket: "netflixgpt-3aa8b.appspot.com",
  messagingSenderId: "532940713048",
  appId: "1:532940713048:web:5083fae0f281b80ff8ae2d",
  measurementId: "G-JL14G9G6ZG"
};

// Initialize Firebase
const app:any = initializeApp(firebaseConfig);
const analytics:any = getAnalytics(app);
console.log(analytics)

export const auth:any = getAuth()