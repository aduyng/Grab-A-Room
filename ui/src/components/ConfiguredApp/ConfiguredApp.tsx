import React from 'react';
import {useAppContext} from "../../contexts/AppContext";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";

function ConfiguredApp() {
    const app = useAppContext();
    if (app.user) {
        return (
            <HomePage/>
        )
    }
    return (
        <LoginPage/>
    )
}

export default ConfiguredApp;
