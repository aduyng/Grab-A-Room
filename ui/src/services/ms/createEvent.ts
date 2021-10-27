import {AuthCodeMSALBrowserAuthenticationProvider} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import getClient from "./getClient";
import {Building, Campus, Floor} from "../../consts";
import addMinutes from "date-fns/addMinutes";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function createEvent(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
                                    campus: Campus, building: Building, floor: Floor, roomNumber: string,
                                    start: Date,
                                    duration: number) {
    const roomName = `${campus.id}-${building.id}-${floor.id}-${roomNumber}`;
    const roomEmailAddress = `${roomName}@sabre.com`;

    const event = {
        subject: 'Adhoc Meeting',
        body: {
            contentType: 'HTML',
            content: 'Adhoc Meeting'
        },
        start: {
            dateTime: start,
            timeZone
        },
        end: {
            dateTime: addMinutes(start, duration),
            timeZone
        },
        attendees: [
            {
                emailAddress: {address: roomEmailAddress, name: roomName},
                type: "resource"
            }
        ]
    };
    const client = getClient(authProvider);

    return client!.api('/me/events')
        .post(event);
}
