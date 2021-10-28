import React from "react";
import Typography from "@mui/material/Typography";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";

const useStyles = makeStyles((theme: Theme) => createStyles({
    footer: {
        display: "flex",
        padding: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center"
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography variant={"subtitle2"}>Grab-A-Room, Sabre G-Blitz 2021</Typography>
        </div>
    );
}
