import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import {AppStyled} from "./AppStyled";
import ChatPage from "./components/chat/chat-page";

const App: React.FC = () => {

    return (
        <AppStyled className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/chat">
                        <Route path=":chat_id" element={<ChatPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppStyled>
    );
}

export default App
