import Box from "@mui/material/Box";
import React from "react";
import {makeStyles, createStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        overflow: 'auto',
        padding: 0,
        margin: 0
    }
}));

interface MainProps {
    children?: React.ReactNode;
}

export default function Main({children}: MainProps) {
    const classes = useStyles();

    return (
        <Box component="main" className={classes.main}>{children}</Box>
    )
}
