import React, {useState} from "react";
import {OAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import Button from "@mui/material/Button";
import {Redirect} from "react-router-dom";


export default function LoginPage() {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    const onSignInClick = () => {
        const auth = getAuth();
        const provider = new OAuthProvider('microsoft.com');

        provider.setCustomParameters({
            prompt: 'consent',
            login_hint: 'duy.nguyen@sabre.com',
            tenant: '03ceccf2-fe27-4c66-abdb-699141848e61'
        });
        provider.addScope('calendars.read');

        signInWithPopup(auth, provider)
            .then(() => {
                setIsSignedIn(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (isSignedIn) {
        return (
            <Redirect to={"/"}/>
        )
    }

    return (
        <>
            <Button onClick={onSignInClick}>Sign In</Button>
        </>
    )
}
