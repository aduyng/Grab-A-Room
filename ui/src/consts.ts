export const DRAWER_WIDTH: number = 240;
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
    redirectUri: 'http://localhost:3000',
    tenantId: '03ceccf2-fe27-4c66-abdb-699141848e61',
    scopes: [
        'user.read',
        'calendars.readwrite'
    ]
};

export interface Floor {
    id: string;
    name: string;
}

export interface Building {
    id: string;
    name: string;
    floors: Floor[]
}

export interface Campus {
    id: string;
    name: string;
    buildings: Building[]
}

export const BLUEPRINT = [
    {
        id: "DFW",
        name: "DFW",
        buildings: [
            {
                id: "BLDGA",
                name: "A",
                floors: [
                    {
                        id: "3",
                        name: "Floor 3rd",
                    } as Floor,
                    {
                        id: "4",
                        name: "Floor 4th"
                    } as Floor
                ]
            } as Building,
            {
                id: "BLDGB",
                name: "B",
                floors: [
                    {
                        id: "4",
                        name: "Floor 2th"
                    } as Floor
                ]
            } as Building
        ]
    } as Campus,
    {
        id: "BLR",
        name: "BLR",
        buildings: [
            {
                id: "BLDGC",
                name: "C",
                floors: [
                    {
                        id: "1",
                        name: "Floor 1"
                    } as Floor
                ]
            } as Building
        ]
    } as Campus
];

export const RESERVE_DURATIONS = [15, 30, 45, 60, 90, 120];
