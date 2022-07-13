import {makeAutoObservable} from "mobx"
import {auth, firestore} from "../firestore/firebase-config";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    fetchSignInMethodsForEmail,
    User as UserInfo
} from "firebase/auth"

// Import the functions you need from the SDKs you need
export interface User extends UserInfo{
}

type AuthMethod = (email: string, password: string) => void

class AuthStoreInstance {
    user: User | null = null
    auth = auth
    firestore = firestore
    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: User) {
        this.user = user
    }

    createUser: AuthMethod = (email, password) => {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode)
            });
    }

    loginUser: AuthMethod = (email, password) => {
        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode)
            });
    }

    logout() {
        signOut(auth)
            .then(() => {
                this.user = null
                window.location.pathname = "/"
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode)
            })
    }
}

const AuthStore = new AuthStoreInstance()

onAuthStateChanged(auth, (user) => {
    if (user) {
        AuthStore.setUser(user)
    }
});

export default AuthStore