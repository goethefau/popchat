import React from 'react';
import {ChatHeaderStyled} from "./chat-styles";
import User from "../user/user";
import UserActions from "../user/user-actions";

const ChatHeader = () => {
    return (
        <>
            <div className="container">
                <ChatHeaderStyled>
                    <User/>
                    <UserActions/>
                </ChatHeaderStyled>
            </div>
            <div style={{width:"100%", height: 1, background: "rgba(152, 162, 179, 0.15)"}}/>
        </>
    );
};

export default ChatHeader;