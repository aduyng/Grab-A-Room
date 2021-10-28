import React, {ChangeEvent, createRef, useState} from "react";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import {getStorage, ref as cloudStorageRef, uploadBytes} from "firebase/storage";
import {getDatabase, onValue, ref as dbRef} from "firebase/database";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
    onDecoded: ({rawText}: { rawText: string | null }) => void;
    onDecoding: () => void;
    disabled: boolean;
}

export default function RoomNumberScanner({
                                              className,
                                              onDecoded,
                                              disabled,
                                              onDecoding
                                          }: RoomNumberScannerProps) {

    const [isDecoding, setIsDecoding] = useState<boolean>(false);

    const imageInputRef = createRef<HTMLInputElement>();
    const classes = useStyles();

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
        onDecoding();
        const storage = getStorage();
        const timestamp = Date.now();
        const to = `/to-be-detected/${timestamp}.png`;
        const storageRef = cloudStorageRef(storage, to);
        return uploadBytes(storageRef, file)
            .then(() => {
                return new Promise<any>((resolve) => {
                    const databaseRef = dbRef(getDatabase(), `doOCR/${timestamp}`);
                    onValue(databaseRef, dbSnapshot => {
                        const lines = dbSnapshot.val();
                        if (lines) {
                            resolve(lines);
                        }
                    })
                })
            })
            .then((lines) => {
                setIsDecoding(false);
                if (lines && lines[0]?.description) {
                    onDecoded({rawText: lines[0]?.description});
                } else {
                    onDecoded({rawText: null});
                }
            });
    }

    return (
        <Box className={className}>
            <input
                accept="image/*"
                className={classes.input}
                type="file"
                capture="environment"
                onChange={onCaptured}
                ref={imageInputRef}
                disabled={disabled}
            />
            <Button fullWidth
                    variant={"contained"}
                    startIcon={<CameraAltOutlined/>}
                    color={"secondary"}
                    disabled={disabled || isDecoding}
                    onClick={onScanButtonClick}>Scan</Button>
        </Box>

    )
}
