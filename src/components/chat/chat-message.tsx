import React from 'react';
import {ChatMessageStyled} from "./chat-styles";
import {ChatMessageModel} from "./chat-model";
import {typography_theme_props} from "../page_components/typography";
import moment from "moment";
import AuthStore from "../auth/auth-store";
import {motion} from "framer-motion";

export const ChatMessageMain = motion(React.forwardRef<HTMLDivElement, ChatMessageModel>(({uid, createdAt, content, displayName, photoURL}, ref) => {
    const isMine = AuthStore.user && (AuthStore.user.uid === uid)

    return (
        createdAt ? (
            <div ref={ref} className={`mt-4 d-flex${isMine ? ` justify-content-end` : ``}`}>
                <div className="d-flex flex-column align-items-center">
                    {!isMine && (
                        <img
                            src={photoURL || ""}
                            alt=""
                            referrerPolicy="no-referrer"
                            style={{
                                height: 36,
                                width: 36,
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "50%"
                            }}
                        />
                    )}
                    {!isMine && (
                        <div className="mt-2" style={{color: typography_theme_props.$light, fontSize: 12}}>
                            {moment(createdAt.toDate()).format("HH:mm")}
                        </div>
                    )}
                </div>
                <div className="ms-4 d-flex flex-column align-items-start justify-content-start">
                    {!isMine && (
                        <div style={{
                            color: typography_theme_props.$light,
                            fontSize: 14,
                            fontFamily: typography_theme_props.medium
                        }}>
                            {displayName}
                        </div>
                    )}
                    <div className="mt-2">
                        <ChatMessageStyled
                            style={isMine ? {
                                borderRadius: "16px 0px 16px 16px",
                                backgroundColor: typography_theme_props.$accent_super_dark,
                                color: "#ffffff"
                            } : {}}
                        >
                            {content}
                        </ChatMessageStyled>
                    </div>
                </div>
            </div>
        ) : <div ref={ref}/>
    );
}))


export const ChatMessage = motion(React.forwardRef<HTMLDivElement, ChatMessageModel>(({uid, content}, ref) => {
    const isMine = AuthStore.user?.uid === uid

    return (
        <div ref={ref} className={`mt-2 d-flex${isMine ? ` justify-content-end` : ``}`}>
            <div className="d-flex flex-column align-items-center">
                <div style={{height: 36, width: 36}}/>
            </div>
            <div className="ms-4 d-flex flex-column align-items-start justify-content-start">
                <div>
                    <ChatMessageStyled
                        style={isMine ? {
                            borderRadius: "16px 0px 16px 16px",
                            backgroundColor: typography_theme_props.$accent_super_dark,
                            color: "#ffffff"
                        } : {}}
                    >
                        {content}
                    </ChatMessageStyled>
                </div>
            </div>
        </div>
    )
}))