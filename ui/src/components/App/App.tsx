import React from 'react';
import ProvideAppContext from "../../contexts/AppContext";
import ConfiguredApp from "../ConfiguredApp/ConfiguredApp";
import {IPublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";

type AppProps = {
    pca: IPublicClientApplication
};

function App({pca}: AppProps) {

    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <ConfiguredApp/>
            </ProvideAppContext>
        </MsalProvider>
    )
}

export default App;
