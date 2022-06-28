import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0WXJjhBnmk72u_Fk8_W4Ncljf6_ep0XI",
  authDomain: "uploadingfiles-c2736.firebaseapp.com",
  projectId: "uploadingfiles-c2736",
  storageBucket: "uploadingfiles-c2736.appspot.com",
  messagingSenderId: "351601544353",
  appId: "1:351601544353:web:f790c72c4993700548f4e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)