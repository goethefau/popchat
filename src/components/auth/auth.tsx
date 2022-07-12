import React from 'react';
import {RoundedButton} from "../page_components/buttons";
import GoogleAuth from "./google-auth";
import FbAuth from "./fb-auth";
import AppleAuth from "./apple-auth";

const Auth = () => {
    return (
        <div className="d-flex">
            <GoogleAuth/>
            <FbAuth className="ms-2"/>
            {/* It isn't ready to use... */}
            {/*<AppleAuth className="ms-3"/>*/}
        </div>
    );
};

export default Auth;