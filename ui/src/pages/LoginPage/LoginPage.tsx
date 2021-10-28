import React from "react";
import CenteredLayout from "../../components/CenteredLayout/CenteredLayout";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import {useAppContext} from "../../contexts/AppContext";

const useStyles = makeStyles((theme: Theme) => createStyles({
    loginPage: {
        textAlign: "center"
    },
    logo: {
        marginBottom: theme.spacing(2)
    },
    signInButton: {
        marginTop: theme.spacing(2)
    }
}));


export default function LoginPage() {
    const classes = useStyles();
    const app = useAppContext();
    return (
        <CenteredLayout>
            <div className={classes.loginPage}>
                <img src="/android-chrome-192x192.png" alt={"logo"} className={classes.logo}/>

                <Button variant={"contained"} startIcon={<LoginIcon/>}
                        fullWidth className={classes.signInButton}
                onClick={app.signIn!}>SIGN IN</Button>
            </div>
        </CenteredLayout>
    );
}
