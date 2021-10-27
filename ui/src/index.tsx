import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import theme from "./theme"
import {ThemeProvider} from "@mui/material";
import {initializeApp} from "firebase/app";
import "firebase/storage";
import "firebase/database";
import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult
} from '@azure/msal-browser';

import {FIREBASE_CONFIG, MS_CONFIG} from "./consts";

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: MS_CONFIG.appId,
        redirectUri: MS_CONFIG.redirectUri,
        authority: `https://login.microsoftonline.com/${MS_CONFIG.tenantId}`
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
    }
});

const accounts = msalInstance.getAllAccounts();
if (accounts && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const authResult = event.payload as AuthenticationResult;
        msalInstance.setActiveAccount(authResult.account);
    }
});

initializeApp(FIREBASE_CONFIG);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App pca={msalInstance}/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO: add to home screen shortcut on mobile device - 1
// TODO: validation for home screen - 1
// TODO: showing response message via toast - 1
// TODO: showing current user name - 2
// TODO: design a logo - 1
// TODO: integrate correct prettier & eslint - 3
// TODO: create video - 1
// TODO: create presentation (easy to use, no installation required) - 1
