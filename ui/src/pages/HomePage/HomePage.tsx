import React, {ChangeEvent, useState} from "react";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import Button from "@mui/material/Button";
import EventAvailable from "@mui/icons-material/EventAvailable";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import RoomNumberScanner from "../../components/RoomNumberScanner/RoomNumberScanner";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2)
    },
    inputGroup: {
        marginTop: theme.spacing(1)
    },
    bookNowButton: {
        marginTop: theme.spacing(2)
    },
    input: {
        display: "none"
    }
}));

export default function HomePage() {
    const [building, setBuilding] = useState<string>("");
    const [detectedRoomNumber, setDetectedRoomNumber] = useState<string>("");
    const classes = useStyles();

    const onBuildingChange = (event: ChangeEvent) => {
        setBuilding((event.target as HTMLInputElement).value)
    }

    const onRoomNumberChange = ({roomNumber}: {roomNumber: string}) => {
        setDetectedRoomNumber(roomNumber);
    }

    return (
        <Paper className={classes.paper}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Building</FormLabel>
                <RadioGroup
                    defaultValue="a"
                    name="building-radio-buttons-group"
                    onChange={onBuildingChange}
                    value={building}
                >
                    <FormControlLabel value="a" control={<Radio />} label="A" />
                    <FormControlLabel value="b" control={<Radio />} label="B" />
                </RadioGroup>
            </FormControl>
            <RoomNumberScanner className={classes.inputGroup} onChange={onRoomNumberChange} />
            <FormControl component="fieldset" className={classes.inputGroup}>
                <FormLabel component="legend">Duration</FormLabel>
                <RadioGroup
                    defaultValue="1"
                    name="duration-radio-buttons-group"
                >
                    <FormControlLabel value="0.25" control={<Radio />} label="15 minutes" />
                    <FormControlLabel value="0.5" control={<Radio />} label="30 minutes" />
                    <FormControlLabel value="0.75" control={<Radio />} label="45 minutes" />
                    <FormControlLabel value="1" control={<Radio />} label="1 hour" />
                    <FormControlLabel value="1.5" control={<Radio />} label="1 hour 30 minutes" />
                    <FormControlLabel value="2" control={<Radio />} label="2 hours" />
                </RadioGroup>
            </FormControl>
            <Button fullWidth variant={"contained"} size={"large"} className={classes.bookNowButton} color={"primary"} startIcon={<EventAvailable />}>Book Now</Button>
        </Paper>
    )
}
