import React from 'react';
import Layout from "../Layout/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ScanRoomNumberPage from "../../pages/ScanRoomNumberPage/ScanRoomNumberPage";
import HomePage from "../../pages/HomePage/HomePage";

function App() {
    return (
        <Layout>
            <Router>
                <Switch>
                    <Route path="/scan">
                        <ScanRoomNumberPage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </Router>
        </Layout>
    );
}

export default App;
