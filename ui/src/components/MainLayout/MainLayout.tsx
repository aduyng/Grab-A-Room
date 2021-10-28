import Box from "@mui/material/Box";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "../Main/Main";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import Header from "../../Header/Header";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}));


interface MainLayoutProps {
    children?: React.ReactNode
}

export default function MainLayout({children}: MainLayoutProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <CssBaseline/>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Box>
    )
}
