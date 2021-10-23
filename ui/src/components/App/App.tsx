import React from 'react';
import Button from "@mui/material/Button";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Layout from "../Layout/Layout";

function App() {
    return (
        <Layout>
            <Button variant={"contained"} startIcon={<CameraAltOutlined/>}>Scan Room Number</Button>
        </Layout>
    );
}

export default App;
