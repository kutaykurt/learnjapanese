// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgNprw8gmCZFGmCqw_BEUYGHARzhJpKA0",
  authDomain: "learnjapanese-f3721.firebaseapp.com",
  projectId: "learnjapanese-f3721",
  storageBucket: "learnjapanese-f3721.appspot.com",
  messagingSenderId: "267703019265",
  appId: "1:267703019265:web:c695ca5e384f4b2df65d00",
  measurementId: "G-DJN4HFKQK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);