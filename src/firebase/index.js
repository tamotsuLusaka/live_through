import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// 開発用
const firebaseConfig = {
  apiKey: "AIzaSyDVF8ji3w-M-1WBYFHtWMRN4T8pkOnkwik",
  authDomain: "live-through.firebaseapp.com",
  projectId: "live-through",
  storageBucket: "live-through.appspot.com",
  messagingSenderId: "710116095375",
  appId: "1:710116095375:web:7039cd73a0ad1f3257c7fa"
};

// 本番用
// const firebaseConfig = {
//   apiKey: "AIzaSyACLWRLpMBX-yW-GwdKge86RK4Ul1tSSe8",
//   authDomain: "live-through-42f07.firebaseapp.com",
//   projectId: "live-through-42f07",
//   storageBucket: "live-through-42f07.appspot.com",
//   messagingSenderId: "699088943152",
//   appId: "1:699088943152:web:0a1d7cb32670c7f52415f5",
//   measurementId: "G-NXPE7BX88D"
// };



const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
console.log(analytics)

export default firebaseApp

