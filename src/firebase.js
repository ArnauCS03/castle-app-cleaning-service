import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBcQhcSK1SM0J04VUJ0Y1oWu65uSrIJujY",
  authDomain: "castle-app-36f34.firebaseapp.com",
  projectId: "castle-app-36f34",
  storageBucket: "castle-app-36f34.appspot.com",
  messagingSenderId: "14611435810",
  appId: "1:14611435810:web:9c0b20c2c001e05756957b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
