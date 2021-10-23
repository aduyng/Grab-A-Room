import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import React, {useRef, useState} from "react";
import {getStorage, ref as cloudStorageRef, uploadString} from "firebase/storage";
import {getDatabase, ref as dbRef, onValue} from "firebase/database";

export default function ScanRoomNumberPage() {
    const [imageTaken, setImageTaken] = useState<string | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const [recognizedText, setRecognizedText] = useState<string | null>(null);

    const handleTakePhoto = (dataUri: string) => {
        setImageTaken(dataUri);
        const storage = getStorage();
        const timestamp = Date.now();
        const to = `/to-be-detected/${timestamp}.png`;
        const storageRef = cloudStorageRef(storage, to);

        return uploadString(storageRef, dataUri, "data_url")
            .then(() => {
                return new Promise<void>((resolve) => {
                    const databaseRef = dbRef(getDatabase(), `doOCR/${timestamp}`);
                    onValue(databaseRef, dbSnapshot => {
                        const lines = dbSnapshot.val();
                        if (lines && lines[0]) {
                            setRecognizedText(lines[0]?.description);
                        }
                        if (lines) {
                            resolve();
                        }
                    })
                })
            });
    }

    return (
        <div ref={rootRef}>
            <Camera
                isImageMirror={false}
                sizeFactor={.5}
                onTakePhoto={(dataUri) => {
                    handleTakePhoto(dataUri);
                }}
            />
            {imageTaken && <img src={imageTaken} alt={"to be detected"}/>}
            <p>
                {recognizedText}
            </p>
        </div>

    )
}
