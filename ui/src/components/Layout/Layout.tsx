import Box from "@mui/material/Box";
import Drawer from "../Drawer/Drawer";
import React, {useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "../AppBar/AppBar";
import Main from "../Main/Main";

interface LayoutProps {
    children?: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const onDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen)
    }

    return (
        <Box>
            <CssBaseline/>
            <AppBar open={isDrawerOpen} toggleDrawer={onDrawerToggle}/>
            <Drawer open={isDrawerOpen} toggle={onDrawerToggle}/>
            <Main>{children}</Main>
        </Box>
    )
}
