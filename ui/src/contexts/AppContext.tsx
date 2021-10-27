import React, {
    useContext,
    createContext,
    useState,
    MouseEventHandler,
    useEffect
} from 'react';

import {AuthCodeMSALBrowserAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import {InteractionType, PublicClientApplication} from '@azure/msal-browser';
import {useMsal} from '@azure/msal-react';
import {MS_CONFIG} from "../consts";
import {getUser, UserWithAvatar} from "../services/ms/getUser";

export interface AppError {
    message: string,
    debug?: string
}

type AppContext = {
    user?: UserWithAvatar;
    error?: AppError;
    signIn?: MouseEventHandler<HTMLElement>;
    signOut?: MouseEventHandler<HTMLElement>;
    displayError?: Function;
    clearError?: Function;
    authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
}

const appContext = createContext<AppContext>({
    user: undefined,
    error: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined
});

export function useAppContext(): AppContext {
    return useContext(appContext);
}

interface ProvideAppContextProps {
    children: React.ReactNode;
}

export default function ProvideAppContext({children}: ProvideAppContextProps) {
    const auth = useProvideAppContext();
    return (
        <appContext.Provider value={auth}>
            {children}
        </appContext.Provider>
    );
}

function useProvideAppContext() {
    const msal = useMsal();
    const [user, setUser] = useState<UserWithAvatar | undefined>(undefined);
    const [error, setError] = useState<AppError | undefined>(undefined);

    useEffect(() => {
        const checkUser = async () => {
            if (!user) {
                try {
                    const account = msal.instance.getActiveAccount();
                    if (account) {
                        const user = await getUser(authProvider);
                        setUser(
                            user
                        );
                    }
                } catch (err: any) {
                    displayError(err.message);
                }
            }
        };
        checkUser();
    });

    const displayError = (message: string, debug?: string) => {
        setError({message, debug});
    }

    const clearError = () => {
        setError(undefined);
    }

    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msal.instance as PublicClientApplication,
        {
            account: msal.instance.getActiveAccount()!,
            scopes: MS_CONFIG.scopes,
            interactionType: InteractionType.Popup
        }
    );

    const signIn = async () => {
        await msal.instance.loginPopup({
            scopes: MS_CONFIG.scopes,
            prompt: 'select_account'
        });

        const user = await getUser(authProvider);

        setUser(user);
    };

    const signOut = async () => {
        await msal.instance.logoutPopup();
        setUser(undefined);
    };

    return {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider
    };
}
