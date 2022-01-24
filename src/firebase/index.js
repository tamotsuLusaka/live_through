import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDVF8ji3w-M-1WBYFHtWMRN4T8pkOnkwik",
  authDomain: "live-through.firebaseapp.com",
  projectId: "live-through",
  storageBucket: "live-through.appspot.com",
  messagingSenderId: "710116095375",
  appId: "1:710116095375:web:7039cd73a0ad1f3257c7fa"
};


const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp