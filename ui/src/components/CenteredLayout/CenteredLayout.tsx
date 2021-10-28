import React from "react";
import Box from "@mui/material/Box";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";

interface CenteredLayoutProps {
    children?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: "100%",
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyItems: "center"
    },
    row: {
        width: "auto",
        margin: "auto",
        marginTop: theme.spacing(3)
    },
}));


export default function CenteredLayout({children}: CenteredLayoutProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.row}>
                {children}
            </Box>
        </Box>
    )
}
