import React, {ChangeEvent, createRef, useState} from "react";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import IconButton from "@mui/material/IconButton";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {getStorage, ref as cloudStorageRef, uploadBytes} from "firebase/storage";
import {getDatabase, onValue, ref as dbRef} from "firebase/database";

const useStyles = makeStyles((theme: Theme) => createStyles({
    inputGroup: {
        marginTop: theme.spacing(1)
    },
    input: {
        display: "none"
    }
}));

export type RoomNumberScannerProps = {
    className: string;
    onChange: ({roomNumber}: { roomNumber: string }) => void;
    value: string;
}

export default function RoomNumberScanner({className, onChange, value}: RoomNumberScannerProps) {
    const [roomNumber, setRoomNumber] = useState<string>(value || "");
    const [isDecoding, setIsDecoding] = useState<boolean>(false);

    const imageInputRef = createRef<HTMLInputElement>();
    const classes = useStyles();

    const onRoomNumberChange = (event: ChangeEvent) => {
        const newRoomNumber = (event.target as HTMLInputElement).value
        setRoomNumber(newRoomNumber);
        onChange({roomNumber: newRoomNumber})
    }

    const onScanButtonClick = () => {
        imageInputRef.current?.click();
    }

    const onCaptured = (event: ChangeEvent): Promise<void> => {
        const files = (event.target as HTMLInputElement).files;
        const file = files ? files[0] : undefined;

        if (!file) {
            return Promise.resolve();
        }

        setIsDecoding(true);
        const storage = getStorage();
        const timestamp = Date.now();
        const to = `/to-be-detected/${timestamp}.png`;
        const storageRef = cloudStorageRef(storage, to);
        return uploadBytes(storageRef, file)
            .then(() => {
                return new Promise<void>((resolve) => {
                    const databaseRef = dbRef(getDatabase(), `doOCR/${timestamp}`);
                    onValue(databaseRef, dbSnapshot => {
                        const lines = dbSnapshot.val();
                        if (lines && lines[0]) {
                            setRoomNumber(lines[0]?.description);
                            onChange({roomNumber: lines[0]?.description});
                        }
                        if (lines) {
                            resolve();
                        }
                    })
                })
            })
            .then(() => setIsDecoding(false));
    }

    return (
        <FormControl variant="outlined" fullWidth className={className}>
            <InputLabel>Room Number</InputLabel>
            <input
                accept="image/*"
                className={classes.input}
                type="file"
                capture="environment"
                onChange={onCaptured}
                ref={imageInputRef}
            />
            <OutlinedInput
                value={roomNumber}
                onChange={onRoomNumberChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            disabled={isDecoding}
                            onClick={onScanButtonClick}
                            edge="end"
                        >
                            {<CameraAltOutlined/>}
                        </IconButton>
                    </InputAdornment>
                }
                label="Room Number"
            />
        </FormControl>
    )
}
