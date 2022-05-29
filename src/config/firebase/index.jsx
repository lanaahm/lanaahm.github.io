// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4LMPejrpP1JG9YiySgvtnabcFjrLBJck',
  authDomain: 'portfolio-84ac8.firebaseapp.com',
  projectId: 'portfolio-84ac8',
  storageBucket: 'portfolio-84ac8.appspot.com',
  messagingSenderId: '372772898939',
  appId: '1:372772898939:web:e9034e0b62633e94c57ade',
  measurementId: 'G-RWGH6G4JQQ'
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);
