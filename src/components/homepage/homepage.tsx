import React from 'react';
import {PageParagraph, PageTitle} from "../page_components/typography";
import Auth from "../auth/auth";
import {observer} from "mobx-react";
import AuthStore from "../auth/auth-store";
import {Navigate} from "react-router-dom";
import {PageContainer} from "../page_components/containers";

const Homepage = () => {
    const user = AuthStore.user
    if(user) return <Navigate to="/chat/21415" replace/>

    return (
        <PageContainer className="justify-content-between">
            <div>
                <PageTitle>
                    Random Popchat
                </PageTitle>
                <PageParagraph align="center" className="mt-3">
                    It’s simple - login and chat will randomly <br/> find you interlocutors!
                </PageParagraph>
                <PageParagraph style={{marginTop: 126}}>
                    Authorize using a Social Media
                </PageParagraph>
                <div className="mt-4 d-flex justify-content-center">
                    <Auth/>
                </div>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <a href="https://github.com/goethefau">
                    <img src="/github.svg"/>
                </a>
                <PageParagraph size={14} className="mt-2">
                    Random Popchat - <a href="https://github.com/goethefau">@gthefau</a> <br/>
                    All right reserved
                </PageParagraph>
            </div>
        </PageContainer>
    );
};

export default observer(Homepage);