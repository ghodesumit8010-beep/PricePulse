import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHDhcKVNfFoScftEroSocNDW9w5iDG-Hc",
  authDomain: "pricepulse-2e3ef.firebaseapp.com",
  projectId: "pricepulse-2e3ef",
  appId: "1:881366313842:web:ac85ee22d70e266426cbeb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();