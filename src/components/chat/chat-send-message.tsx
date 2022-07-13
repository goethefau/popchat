import React, {FormEvent, FormEventHandler, useState} from 'react';
import {ChatSendButton, ChatSendMessageInputWrapper} from "./chat-styles";
import {TextareaAutosize} from "@mui/material";
import {collection, serverTimestamp, FieldValue} from "firebase/firestore";
import useAddDoc from "../firestore/useAddDoc";
import {ChatMessageModel} from "./chat-model";
import AuthStore from "../auth/auth-store";

const ChatSendEmoji = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 18.75C7.67936 18.75 5.45376 17.8281 3.81282 16.1872C2.17187 14.5462 1.25 12.3206 1.25 10C1.25 7.67936 2.17187 5.45376 3.81282 3.81282C5.45376 2.17187 7.67936 1.25 10 1.25C12.3206 1.25 14.5462 2.17187 16.1872 3.81282C17.8281 5.45376 18.75 7.67936 18.75 10C18.75 12.3206 17.8281 14.5462 16.1872 16.1872C14.5462 17.8281 12.3206 18.75 10 18.75ZM10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20V20Z"
                fill="#1C1E41"/>
            <path
                d="M5.35624 11.9588C5.49979 11.8759 5.67039 11.8534 5.83049 11.8963C5.9906 11.9392 6.12711 12.044 6.20999 12.1875C6.59388 12.8529 7.14631 13.4055 7.81166 13.7895C8.477 14.1735 9.23178 14.3755 9.99999 14.375C10.7682 14.3755 11.523 14.1735 12.1883 13.7895C12.8537 13.4055 13.4061 12.8529 13.79 12.1875C13.8307 12.1158 13.8852 12.053 13.9504 12.0025C14.0155 11.952 14.09 11.9148 14.1696 11.8932C14.2491 11.8716 14.3321 11.866 14.4139 11.8766C14.4956 11.8872 14.5744 11.9139 14.6458 11.9551C14.7172 11.9964 14.7797 12.0513 14.8298 12.1168C14.8799 12.1822 14.9165 12.257 14.9376 12.3367C14.9586 12.4163 14.9637 12.4994 14.9526 12.5811C14.9414 12.6627 14.9142 12.7414 14.8725 12.8125C14.3789 13.6679 13.6687 14.3783 12.8133 14.872C11.958 15.3657 10.9876 15.6254 9.99999 15.625C9.01236 15.6254 8.04204 15.3657 7.18667 14.872C6.33131 14.3783 5.62109 13.6679 5.1275 12.8125C5.04462 12.669 5.02216 12.4984 5.06506 12.3383C5.10796 12.1781 5.2127 12.0416 5.35624 11.9588ZM8.74999 8.125C8.74999 9.16 8.18999 10 7.49999 10C6.80999 10 6.24999 9.16 6.24999 8.125C6.24999 7.09 6.80999 6.25 7.49999 6.25C8.18999 6.25 8.74999 7.09 8.74999 8.125ZM13.75 8.125C13.75 9.16 13.19 10 12.5 10C11.81 10 11.25 9.16 11.25 8.125C11.25 7.09 11.81 6.25 12.5 6.25C13.19 6.25 13.75 7.09 13.75 8.125Z"
                fill="#1C1E41"/>
        </svg>
    )
}
const ChatSendFile = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4_54)">
                <path
                    d="M3.37344 19.6803C2.52563 19.6803 1.71163 19.3294 1.06288 18.6801C-0.375559 17.2369 -0.375559 14.8898 1.06255 13.4476L12.2788 1.53695C14.0288 -0.215861 16.7094 -0.058361 18.6657 1.90039C19.5422 2.77851 20.0341 4.04445 20.0157 5.37508C19.9972 6.69166 19.4829 7.95164 18.6038 8.83226L10.1269 17.8566C9.89097 18.1095 9.49534 18.121 9.24348 17.8838C8.99223 17.6463 8.98005 17.2501 9.21692 16.9982L17.7066 7.96008C18.3707 7.29476 18.7516 6.35099 18.7657 5.35756C18.7797 4.36351 18.4207 3.42631 17.7819 2.78599C16.5819 1.58349 14.6281 0.953807 13.1756 2.40974L1.95969 14.3204C0.99532 15.2872 0.995632 16.8401 1.94719 17.7941C2.39343 18.2407 2.92311 18.4582 3.48718 18.4241C4.0453 18.39 4.61905 18.1038 5.1028 17.6188L14.0272 8.12002C14.3506 7.79596 15.0006 7.00158 14.339 6.33846C13.9643 5.96314 13.7012 5.98627 13.6147 5.99346C13.3675 6.01533 13.0787 6.18627 12.7791 6.48689L6.06186 13.631C5.82468 13.8831 5.42874 13.8953 5.17841 13.6575C4.92684 13.4206 4.91528 13.0238 5.15184 12.7725L11.8813 5.61502C12.4103 5.08346 12.9513 4.79533 13.5019 4.74596C13.9316 4.70781 14.5706 4.79939 15.2225 5.45314C16.19 6.4225 16.0697 7.84439 14.9241 8.99252L5.99969 18.4906C5.28719 19.2056 4.42686 19.6209 3.56374 19.674C3.5003 19.6784 3.43686 19.6803 3.37343 19.6803L3.37344 19.6803Z"
                    fill="#1C1E41"/>
            </g>
            <defs>
                <clipPath id="clip0_4_54">
                    <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}

interface DocumentModel extends Omit<ChatMessageModel, "createdAt"> {
    createdAt: FieldValue;
}

const ChatSendMessage = () => {
    const [input, setInput] = useState<string>("")
    const {send, isLoading, error} = useAddDoc<DocumentModel>(collection(AuthStore.firestore, "messages"))

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input.trim() == "") return
        setInput("")

        send({
            uid: AuthStore.user?.uid,
            content: input,
            photoURL: AuthStore.user?.photoURL,
            displayName: AuthStore.user?.displayName,
            createdAt: serverTimestamp()
        })
    }

    return (
        <form onSubmit={sendMessage}>
            <div className="d-flex align-items-end">
                <ChatSendMessageInputWrapper className="flex-grow-1 me-3">
                    <ChatSendEmoji/>
                    <TextareaAutosize
                        placeholder="Type a message"
                        value={input}
                        onChange={el => setInput(el.target.value)}
                    />
                    <ChatSendFile/>
                </ChatSendMessageInputWrapper>
                <div>
                    <ChatSendButton
                        disabled={isLoading}
                        type="submit"
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4_45)">
                                <path
                                    d="M20.4531 0.1375L0.537105 11.6273C-0.24063 12.0742 -0.141802 13.157 0.631636 13.4836L5.19921 15.4L17.5441 4.52031C17.7805 4.30977 18.1156 4.63203 17.9137 4.87695L7.5625 17.4883V20.9473C7.5625 21.9613 8.78711 22.3609 9.38867 21.6262L12.1172 18.3047L17.4711 20.5477C18.0812 20.8055 18.7773 20.423 18.8891 19.7656L21.9828 1.20313C22.1289 0.335157 21.1965 -0.292187 20.4531 0.1375Z"
                                    fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_4_45">
                                    <rect width="22" height="22" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </ChatSendButton>
                </div>
            </div>
        </form>

    );
};

export default ChatSendMessage;