import React from 'react';
import {observer} from "mobx-react"
import AuthStore from "../auth/auth-store";
import {PageParagraph} from "../page_components/typography";
import {Link} from "react-router-dom";
import {PageContainer} from "../page_components/containers";
import ChatHeader from "./chat-header";
import {ChatContainer, ChatMessagesContainer} from "./chat-styles";
import {useCollection} from "react-firebase-hooks/firestore";
import {getFirestore, collection, query, orderBy} from 'firebase/firestore';
import {app} from "../firestore/firebase-config";
import ChatSendMessage from "./chat-send-message";
import {ChatMessageModel} from "./chat-model";
import {ChatMessage, ChatMessageMain} from "./chat-message";

import {useEffect, useRef} from "react"
import {leftBounceVariants} from "../framer-motion/anims";

const ChatPage = () => {
    const user = AuthStore.user
    const bottomRef = useRef<HTMLDivElement>(null);

    const [value, loading, error] = useCollection(
        query(collection(getFirestore(app), 'messages'), orderBy("createdAt")),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [value])

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
                    <div className="container flex-grow-1 d-flex flex-column">
                        <div className="flex-grow-1 position-relative" style={{marginBottom: 36}}>
                            <ChatMessagesContainer>
                                {/* Handling messages loading */}
                                {loading && "Loading..."}
                                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                                {value && value.docs.map((doc, i) => {
                                    const data = doc.data() as ChatMessageModel

                                    if (i === 0) {
                                        return <ChatMessageMain
                                            key={doc.id}
                                            {...data}
                                            initial="hidden"
                                            whileInView="visible"
                                            variants={leftBounceVariants}
                                            viewport={{ once: true }}
                                            custom={i + 1}
                                        />
                                    } else if (value.docs[i - 1].data().uid == data.uid) {
                                        return <ChatMessage
                                            key={doc.id}
                                            {...data}
                                            initial="hidden"
                                            whileInView="visible"
                                            variants={leftBounceVariants}
                                            viewport={{ once: true }}

                                        />
                                    } else {
                                        return <ChatMessageMain
                                            key={doc.id}
                                            {...data}
                                            initial="hidden"
                                            whileInView="visible"
                                            variants={leftBounceVariants}
                                            viewport={{ once: true }}
                                        />
                                    }
                                })}

                                {/* Element to scroll when add new massages */}
                                <div ref={bottomRef}/>
                            </ChatMessagesContainer>
                        </div>
                        <ChatSendMessage/>
                    </div>
                </ChatContainer>
            </>
        )
    )
};

export default observer(ChatPage);