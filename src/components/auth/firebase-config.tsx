import {initializeApp} from "firebase/app";
import {
    getAuth,
} from "firebase/auth";

import {getFirestore} from "firebase/firestore"

export const firebaseConfig = {
    apiKey: "AIzaSyAigtGh2avp7116_Lqc5PorvRGVaeLCQUw",
    authDomain: "popchar-e2a03.firebaseapp.com",
    projectId: "popchar-e2a03",
    storageBucket: "popchar-e2a03.appspot.com",
    messagingSenderId: "506487072837",
    appId: "1:506487072837:web:30cb0f5e95e2bc40785b2c",
    measurementId: "G-8KNKKGP4TB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
