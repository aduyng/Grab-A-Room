import React from 'react';
import MainLayout from "../MainLayout/MainLayout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import {useAppContext} from "../../contexts/AppContext";
import Button from "@mui/material/Button";
import CenteredLayout from "../CenteredLayout/CenteredLayout";
import LoginOutlined from "@mui/icons-material/LoginOutlined";

function ConfiguredApp() {
    const app = useAppContext();
    if (app.user) {
        return (
            <MainLayout>
                <Router>
                    <Switch>
                        <Route path="/">
                            <HomePage/>
                        </Route>
                    </Switch>
                </Router>
            </MainLayout>
        )
    }
    return (
        <CenteredLayout>
            <Button variant={"contained"}
                    fullWidth
                    onClick={app.signIn!} startIcon={<LoginOutlined/>}>SIGN IN</Button>
        </CenteredLayout>
    )
}

export default ConfiguredApp;
