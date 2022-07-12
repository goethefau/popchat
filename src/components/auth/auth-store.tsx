import {makeAutoObservable} from "mobx"
import {auth, firestore} from "./firebase-config";
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
} from "firebase/auth"

// Import the functions you need from the SDKs you need
export interface User {
    name: string | null,
    photoUrl: string | null
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
        AuthStore.setUser({
            name: user.displayName,
            photoUrl: user.photoURL
        })
    } else {
        AuthStore.logout()
    }
});

export default AuthStore