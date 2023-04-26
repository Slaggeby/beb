// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import Constants from 'expo-constants';
// denna kanske breakar allt
//import { Firestore } from "firebase/firestore";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: Constants.manifest.extra.apiKey,

  authDomain: Constants.manifest.extra.authDomain,

  projectId: Constants.manifest.extra.projectId,

  storageBucket: Constants.manifest.extra.storageBucket,

  messagingSenderId:Constants.manifest.extra.messagingSenderId,

  appId: Constants.manifest.extra.appId,

  measurementId: Constants.manifest.extra.measurementId

};


// Initialize Firebase

initializeApp(firebaseConfig);

//const analytics = getAnalytics();
export const auth = getAuth();
export const database = getFirestore();