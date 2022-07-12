import React from 'react';
import {observer} from "mobx-react"
import AuthStore from "../auth/auth-store";
import {PageParagraph} from "../page_components/typography";
import {Link, Navigate} from "react-router-dom";
import {PageContainer} from "../page_components/containers";
import ChatHeader from "./chat-header";
import {ChatContainer} from "./chat-styles";

const ChatPage = () => {
    const user = AuthStore.user

    return (
        !user ? (
            <PageContainer className="align-items-center justify-content-center">
                <PageParagraph>
                    You should to <Link to="/">Authorize</Link>
                </PageParagraph>
            </PageContainer>
        ) : (
            <>
                <ChatHeader/>
                <ChatContainer>

                </ChatContainer>
            </>
        )
    )
};

export default observer(ChatPage);