import Promise from "bluebird";
import {ProfilePhoto, User} from '@microsoft/microsoft-graph-types';
import {AuthCodeMSALBrowserAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import getClient from "./getClient";
import {Room} from "../../consts";

export interface UserProfile extends User {
    avatar: ProfilePhoto;
    rooms: Room[]
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<UserProfile> {
    const client = getClient(authProvider);
    return Promise.all([
        client!.api('/me')
            .select('displayName,mail,userPrincipalName')
            .get(),
        client!.api(`/me/photos/48x48/$value`)
            .get(),
        client!.api('/me/findRooms')
            .version('beta')
            .get()
    ])
        .spread((user: any, avatar: any, rooms: any) => {
            return {
                ...user,
                avatar,
                rooms: rooms.value
            };
        })

}
