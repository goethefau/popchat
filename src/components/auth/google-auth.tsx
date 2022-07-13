import React from 'react';
import {RoundedButton} from "../page_components/buttons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthStore from "./auth-store";

const googleLogin = () => {
    signInWithPopup(AuthStore.auth, new GoogleAuthProvider())
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result)
            // const token = credential ? credential.accessToken : null
            const user = result.user;
            AuthStore.setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential)
    });
}

const GoogleAuth:React.FC<{className?: string}> = ({...props}) => {
    return (
        <RoundedButton onClick={googleLogin} {...props}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6626 10.0415H21.8571V10H12.8571V14H18.5086C17.6841 16.3285 15.4686 18 12.8571 18C9.54365 18 6.85715 15.3135 6.85715 12C6.85715 8.6865 9.54365 6 12.8571 6C14.3866 6 15.7781 6.577 16.8376 7.5195L19.6661 4.691C17.8801 3.0265 15.4911 2 12.8571 2C7.33465 2 2.85715 6.4775 2.85715 12C2.85715 17.5225 7.33465 22 12.8571 22C18.3796 22 22.8571 17.5225 22.8571 12C22.8571 11.3295 22.7881 10.675 22.6626 10.0415Z" fill="#FFC107"/>
                <path d="M4.01015 7.3455L7.29565 9.755C8.18465 7.554 10.3376 6 12.8571 6C14.3866 6 15.7781 6.577 16.8376 7.5195L19.6661 4.691C17.8801 3.0265 15.4911 2 12.8571 2C9.01615 2 5.68515 4.1685 4.01015 7.3455Z" fill="#FF3D00"/>
                <path d="M12.8572 22C15.4402 22 17.7872 21.0115 19.5617 19.404L16.4667 16.785C15.4289 17.5742 14.1609 18.001 12.8572 18C10.2562 18 8.04765 16.3415 7.21565 14.027L3.95465 16.5395C5.60965 19.778 8.97065 22 12.8572 22Z" fill="#4CAF50"/>
                <path d="M22.6626 10.0415H21.8571V10H12.8571V14H18.5086C18.1143 15.1082 17.4038 16.0766 16.4651 16.7855L16.4666 16.7845L19.5616 19.4035C19.3426 19.6025 22.8571 17 22.8571 12C22.8571 11.3295 22.7881 10.675 22.6626 10.0415Z" fill="#1976D2"/>
            </svg>
        </RoundedButton>
    );
};

export default GoogleAuth;