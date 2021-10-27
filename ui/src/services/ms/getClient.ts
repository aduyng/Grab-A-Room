import {Client} from '@microsoft/microsoft-graph-client';
import {AuthCodeMSALBrowserAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

let client: Client | undefined = undefined;

export default function getClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
    if (!client) {
        client = Client.initWithMiddleware({
            authProvider: authProvider
        });
    }

    return client;
}
