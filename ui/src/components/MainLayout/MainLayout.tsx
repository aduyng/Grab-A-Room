import Box from "@mui/material/Box";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "../Main/Main";

interface MainLayoutProps {
    children?: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps) {

    return (
        <Box>
            <CssBaseline/>
            <Main>{children}</Main>
        </Box>
    )
}
