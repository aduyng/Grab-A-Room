export const DRAWER_WIDTH: number = 240;
export const MAX_ROOM_STATUS_RESPONSE_IN_MS = 30000;
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDXV5i08qw3y_1sPuuZdEAJRG1Y5ZtKWGs",
    authDomain: "grab-a-room.firebaseapp.com",
    databaseURL: "https://grab-a-room-default-rtdb.firebaseio.com",
    projectId: "grab-a-room",
    storageBucket: "grab-a-room.appspot.com",
    messagingSenderId: "890875421873",
    appId: "1:890875421873:web:b299127965101264a2ae90"
};

export const MS_CONFIG = {
    appId: '6bda45a7-a1d3-4298-bcc6-f0e50c86bd85',
    redirectUri: window.location.origin,
    tenantId: '03ceccf2-fe27-4c66-abdb-699141848e61',
    scopes: [
        'user.read',
        'user.readbasic.all',
        'calendars.readwrite'
    ]
};

export interface Room {
    name: string;
    address: string;
}

export const RESERVE_DURATIONS = [15, 30, 45, 60, 90, 120];
