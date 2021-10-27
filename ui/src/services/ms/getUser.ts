import {ProfilePhoto, User} from '@microsoft/microsoft-graph-types';
import {AuthCodeMSALBrowserAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import getClient from "./getClient";

export interface UserWithAvatar extends User {
    avatar: ProfilePhoto
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<UserWithAvatar> {
    const client = getClient(authProvider);

    return client!.api('/me')
        .select('displayName,mail,userPrincipalName')
        .get()
        .then(user => {
            return client!.api(`/me/photos/48x48/$value`)
                .get()
                .then(photoResult => {
                    return {
                        ...user, avatar: photoResult
                    };
                });

        })
}
