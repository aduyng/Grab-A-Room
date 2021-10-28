import {Room} from "../../consts";
import toLower from "lodash/toLower";

export default function findRoom(rooms: Room[], rawText: string): Room | null {
    const cleanedText = rawText.replace(/[\r\n]+/g, '');
    if (!cleanedText) {
        return null;
    }
    // DFW room format
    let matches = /([A-Z])(\d).(\d+)(\w+)/m.exec(cleanedText);
    if (matches) {
        const roomName = toLower(matches[4]);
        if (roomName) {
            const foundRoom = rooms.find(room => toLower(room.name).includes(roomName) || toLower(room.address).includes(roomName));
            return foundRoom || null;
        }
    }

    //TODO: use one of the famous algorithm to find the matching room
    const foundRoom = rooms.find(room => toLower(room.name).includes(toLower(cleanedText))
        || toLower(room.address).includes(toLower(cleanedText)));
    return foundRoom || null;
}
