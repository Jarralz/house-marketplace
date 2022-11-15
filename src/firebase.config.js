// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwflxUWGhGCJg-1FR2ZXNJM60KT9cO6A0",
    authDomain: "house-marketplace-a4d1d.firebaseapp.com",
    projectId: "house-marketplace-a4d1d",
    storageBucket: "house-marketplace-a4d1d.appspot.com",
    messagingSenderId: "326797828794",
    appId: "1:326797828794:web:7fcf8067505e0774af5883"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();