import React, {useEffect, useState} from 'react';
import Layout from "../Layout/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ScanRoomNumberPage from "../../pages/ScanRoomNumberPage/ScanRoomNumberPage";
import HomePage from "../../pages/HomePage/HomePage";
import {getAuth, onIdTokenChanged, getIdToken} from "firebase/auth";
import SessionContext from "../../contexts/SessionContext";
import LoginPage from "../../pages/LoginPage/LoginPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import {CircularProgress} from "@mui/material";

export interface UserInfo {
    token: string;
    logOut: Function;
}

function onAuthStateChange(callback: (userInfo: UserInfo | null) => void) {
    const auth = getAuth();
    return onIdTokenChanged(auth, signedInUser => {
        if (signedInUser) {
            getIdToken(signedInUser)
                .then(token => {
                    localStorage.setItem("token", token);
                    callback({
                        token,
                        logOut: () => {
                            localStorage.removeItem("token");
                            auth.signOut();
                        }
                    });
                });
        } else {
            callback(null);
        }
    });
}


function App() {
    const [session, setSession] = useState<UserInfo | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(userInfo => {
            if (!userInfo) {
                setSession(null);
                setIsInitialized(true);
                return false;
            }

            setSession(userInfo);
            setIsInitialized(true);
        });
        return () => {
            return unsubscribe && unsubscribe();
        };
    }, []);

    if (!isInitialized) {
        return <CircularProgress/>;
    }

    return (
        <SessionContext.Provider value={session}>
            <Layout>
                <Router>
                    <Switch>
                        <PrivateRoute path="/scan">
                            <ScanRoomNumberPage/>
                        </PrivateRoute>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <PrivateRoute path="/">
                            <HomePage/>
                        </PrivateRoute>
                    </Switch>
                </Router>
            </Layout>
        </SessionContext.Provider>
    );
}

export default App;
