import {AuthCodeMSALBrowserAuthenticationProvider} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import {Attendee, Event} from "@microsoft/microsoft-graph-types";
import getClient from "./getClient";
import {MAX_ROOM_STATUS_RESPONSE_IN_MS, Room} from "../../consts";
import addMinutes from "date-fns/addMinutes";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function roundTimeQuarterHour(time: Date): Date {
    const timeToReturn = new Date(time.getTime());
    timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn;
}

export default function createEvent(authProvider: AuthCodeMSALBrowserAuthenticationProvider,
                                    room: Room,
                                    start: Date,
                                    duration: number): Promise<Event | null> {
    const startDate = roundTimeQuarterHour(start);
    const event = {
        subject: 'Ad hoc Meeting',
        body: {
            contentType: 'HTML',
            content: 'Ad hoc Meeting'
        },
        start: {
            dateTime: startDate,
            timeZone
        },
        end: {
            dateTime: addMinutes(startDate, duration),
            timeZone
        },
        attendees: [
            {
                emailAddress: {address: room.address, name: room.name},
                type: "resource"
            }
        ]
    };
    const client = getClient(authProvider);

    return client!.api('/me/events')
        .post(event)
        .then((createdEvent: Event) => {
            let intervalHandler: any;
            return new Promise<string>((resolve, reject) => {
                let roomResponseStatus = "none";
                let timePassed = 0;
                intervalHandler = setInterval(() => {
                    console.log(`checking at ${timePassed}`);
                    client!.api(`/me/events/${createdEvent.id}`)
                        .header('Prefer', `outlook.timezone="${timeZone}"`)
                        .select('attendees')
                        .get()
                        .then((foundEvent: Event): any => {
                            const reservedRoom: Attendee | undefined = foundEvent.attendees?.find(attendee => attendee.emailAddress?.address === room.address);
                            if (!reservedRoom) {
                                clearInterval(intervalHandler);
                                return reject("ROOM_NOT_FOUND");
                            }

                            if (reservedRoom.status!.response !== roomResponseStatus) {
                                clearInterval(intervalHandler);
                                return resolve(reservedRoom.status!.response!.toUpperCase());
                            }
                            timePassed += 1000;
                            if (timePassed > MAX_ROOM_STATUS_RESPONSE_IN_MS) {
                                clearInterval(intervalHandler);
                                return reject("TIMED_OUT");
                            }
                        })
                        .catch(error => {
                            console.error(`failed to request for created event: ${error}`);
                            clearInterval(intervalHandler);
                        })
                }, 1000);
            })
                .then(roomStatus => {
                    if (intervalHandler) {
                        clearInterval(intervalHandler)
                    }
                    console.log("final room status", roomStatus);
                    if (roomStatus !== "ACCEPTED") {
                        return client!.api(`/me/events/${createdEvent.id}`)
                            .delete()
                            .then(() => {
                                console.log(`the created event has been deleted`);
                                throw new Error(roomStatus);
                            })
                            .catch(error => {
                                console.error(`failed to delete created event: ${error}`);
                                throw error;
                            })
                    }
                    return createdEvent;
                });
        });
}
