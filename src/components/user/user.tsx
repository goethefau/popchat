import React from 'react';
import {UserAvatar} from "./user-styles";
import {typography_theme_props} from "../page_components/typography";
import {observer} from "mobx-react";
import AuthStore from "../auth/auth-store";

const User = () => {
    const user = AuthStore.user

    return (
        user && (
            <div className="d-flex align-items-center">
                <UserAvatar src={user.photoUrl || ""} className="me-3"/>
                <div style={{color: typography_theme_props.$light, fontFamily: typography_theme_props.medium, fontSize: 14}}>
                    {user.name}
                </div>
            </div>
        )
    );
};

export default observer(User);