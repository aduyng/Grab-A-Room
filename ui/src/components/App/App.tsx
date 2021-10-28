import React from 'react';
import ProvideAppContext from "../../contexts/AppContext";
import {IPublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {SnackbarProvider} from 'notistack';
import Grow from "@mui/material/Grow";
import ConfiguredApp from "../ConfiguredApp/ConfiguredApp";

type AppProps = {
    pca: IPublicClientApplication
};

function App({pca}: AppProps) {

    return (
        <SnackbarProvider maxSnack={3}
                          anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                          autoHideDuration={5000}
                          // @ts-ignore
                          TransitionComponent={Grow}
                          preventDuplicate={true}>
            <MsalProvider instance={pca}>
                <ProvideAppContext>
                    <ConfiguredApp />
                </ProvideAppContext>
            </MsalProvider>
        </SnackbarProvider>
    )
}

export default App;
