import React from "react";
import Typography from "@mui/material/Typography";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import ExitToApp from "@mui/icons-material/ExitToApp";
import {useAppContext} from "../contexts/AppContext";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme: Theme) => createStyles({
    header: {
        display: "flex",
        padding: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        marginRight: theme.spacing(1)
    },
    signOut: {
        right: 0
    }
}));

export default function Header() {
    const classes = useStyles();
    const app = useAppContext();

    return (
        <div className={classes.header}>
            <img src="/favicon-32x32.png" alt={"logo"} className={classes.logo}/>
            <Typography variant={"h4"}>Hi, {app.user!.displayName}</Typography>
            <IconButton className={classes.signOut} onClick={app.signOut!}><ExitToApp/></IconButton>
        </div>
    );
}
