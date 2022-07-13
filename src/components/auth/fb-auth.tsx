import React from 'react';
import {RoundedButton} from "../page_components/buttons";
import {signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import AuthStore from "./auth-store";

const fbLogin = () => {
    signInWithPopup(AuthStore.auth, new FacebookAuthProvider())
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential ? credential.accessToken : null;
            const user = result.user;
            AuthStore.setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential)
        });
}

const FbAuth:React.FC<{className?: string}> = ({...props}) => {
    return (
        <RoundedButton onClick={fbLogin} {...props}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.0714264 12.067C0.0714264 18.033 4.40443 22.994 10.0714 24V15.333H7.07143V12H10.0714V9.333C10.0714 6.333 12.0044 4.667 14.7384 4.667C15.6044 4.667 16.5384 4.8 17.4044 4.933V8H15.8714C14.4044 8 14.0714 8.733 14.0714 9.667V12H17.2714L16.7384 15.333H14.0714V24C19.7384 22.994 24.0714 18.034 24.0714 12.067C24.0714 5.43 18.6714 0 12.0714 0C5.47143 0 0.0714264 5.43 0.0714264 12.067Z" fill="#6172F3"/>
            </svg>
        </RoundedButton>
    );
};

export default FbAuth;