import React, {ChangeEvent, MouseEvent, useState} from "react";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import Button from "@mui/material/Button";
import EventAvailable from "@mui/icons-material/EventAvailable";
import Paper from "@mui/material/Paper";
import RoomNumberScanner from "../../components/RoomNumberScanner/RoomNumberScanner";
import DurationSelector from "../../components/DurationSelector/DurationSelector";
import {useAppContext} from "../../contexts/AppContext";
import createEvent from "../../services/ms/createEvent";
import {useSnackbar} from 'notistack';
import findRoom from "./findRoom";
import {Room} from "../../consts";
import RoomNumberInput from "../../components/RoomNumberInput/RoomNumberInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2)
    },
    inputGroup: {
        marginTop: '.5rem !important',
        display: "flex"
    },
    bookNowButton: {
        marginTop: theme.spacing(2)
    },
    scanButton: {
        marginBottom: theme.spacing(1)
    }
}));

export default function HomePage() {
    const {authProvider, user} = useAppContext();

    // TODO: get from settings
    const [duration, setDuration] = useState<number>(30);
    const [roomNumber, setRoomNumber] = useState<string>("");
    const [isReserving, setIsReserving] = useState<boolean>(false);
    const [isRoomNumberDecoding, setIsRoomNumberDecoding] = useState<boolean>(false);
    const [room, setRoom] = useState<Room | null>(null);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const classes = useStyles();

    const onDurationChange = (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setDuration(parseInt(value, 10));
    }

    const onRoomNumberChange = (term: string) => {
        const matchingRoom = findRoom(user!.rooms, term);
        if (matchingRoom) {
            setRoom(matchingRoom);
        }
    }

    const onRoomNumberDecoded = ({rawText}: { rawText: string | null }) => {
        setIsRoomNumberDecoding(false);

        if (!rawText) {
            enqueueSnackbar("Failed to decode the captured image. Please try again!", {
                variant: "error",
            });
            return;
        }

        const matchingRoom = findRoom(user!.rooms, rawText);
        if (matchingRoom) {
            setRoom(matchingRoom);
            setRoomNumber(matchingRoom?.name);
            enqueueSnackbar("Decoding completed. The room is found.", {
                variant: "info",
            });
        } else {
            enqueueSnackbar(`The room is not found`, {
                variant: "error",
            });
            setRoomNumber(rawText);
        }
    }

    const onBookNowClick = async (event: MouseEvent) => {
        event.preventDefault();
        setIsReserving(true);
        let key = enqueueSnackbar("Reserving the room and confirming the availability. Please wait...", {
            variant: "info",
            persist: true
        });

        try {
            await createEvent(authProvider!,
                room!,
                new Date(), duration);
            closeSnackbar(key);

            enqueueSnackbar("The room has successfully reserved. Have a productive meeting!", {
                variant: "success",
                persist: false
            })
        } catch (error) {
            closeSnackbar(key);
            enqueueSnackbar(`Failed to reserve the room. There might have been a conflict. response: "${error}"`, {
                variant: "error",
                persist: false
            })
        }
        setIsReserving(false);
    }

    const onRoomNumberDecoding = () => {
        setIsRoomNumberDecoding(true);
        enqueueSnackbar("Decoding the room number from the picture. Please wait...", {
            variant: "info",
        });
    }
    return (
        <Box>
            <Typography variant={"h2"} gutterBottom>Grab-A-Room</Typography>
            <Paper className={classes.paper}>

                <RoomNumberScanner
                    className={classes.scanButton}
                    onDecoding={onRoomNumberDecoding}
                    onDecoded={onRoomNumberDecoded}
                    disabled={isReserving || isRoomNumberDecoding}
                />

                <RoomNumberInput className={classes.inputGroup}
                                 value={roomNumber}
                                 disabled={isReserving || isRoomNumberDecoding}
                                 onChange={onRoomNumberChange}/>


                <DurationSelector
                    row
                    className={classes.inputGroup}
                    value={duration.toString()}
                    onChange={onDurationChange}
                    disabled={isReserving || isRoomNumberDecoding}
                />

                <Button
                    fullWidth variant={"contained"}
                    size={"large"}
                    className={classes.bookNowButton}
                    color={"primary"}
                    startIcon={<EventAvailable/>}
                    onClick={onBookNowClick}
                    disabled={isReserving || isRoomNumberDecoding || !room}
                >Book Now</Button>
            </Paper>
        </Box>
    )
}
