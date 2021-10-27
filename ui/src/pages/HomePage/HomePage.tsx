import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import Button from "@mui/material/Button";
import EventAvailable from "@mui/icons-material/EventAvailable";
import Paper from "@mui/material/Paper";
import RoomNumberScanner from "../../components/RoomNumberScanner/RoomNumberScanner";
import {BLUEPRINT, Building, Campus, Floor} from "../../consts";
import CampusSelector from "../../components/CampusSelector/CampusSelector";
import BuildingSelector from "../../components/BuildingSelector/BuildingSelector";
import FloorSelector from "../../components/FloorSelector/FloorSelector";
import DurationSelector from "../../components/DurationSelector/DurationSelector";
import {useAppContext} from "../../contexts/AppContext";
import createEvent from "../../services/ms/createEvent";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2)
    },
    inputGroup: {
        marginTop: theme.spacing(1),
        display: "flex"
    },
    bookNowButton: {
        marginTop: theme.spacing(2)
    },
}));

export default function HomePage() {
    const app = useAppContext();
    // TODO: get from settings
    const [building, setBuilding] = useState<Building>(BLUEPRINT[0].buildings[0]);
    const [floor, setFloor] = useState<Floor>(BLUEPRINT[0].buildings[0].floors[0]);
    const [campus, setCampus] = useState<Campus>(BLUEPRINT[0]);
    const [duration, setDuration] = useState<number>(30);
    const [detectedRoomNumber, setDetectedRoomNumber] = useState<string>("");
    const classes = useStyles();

    useEffect(() => {
        setBuilding(campus.buildings[0])
    }, [campus])

    const onCampusChange = (event: ChangeEvent) => {
        const campusId = (event.target as HTMLInputElement).value;
        const newCampus = BLUEPRINT.find(c => c.id === campusId);
        if (newCampus) {
            setCampus(newCampus);
            setBuilding(newCampus.buildings[0]);
            setFloor(newCampus.buildings[0].floors[0]);
        }
    }

    const onBuildingChange = (event: ChangeEvent) => {
        const buildingId = (event.target as HTMLInputElement).value;
        const newBuilding = campus.buildings.find(c => c.id === buildingId);
        if (newBuilding) {
            setBuilding(newBuilding);
            setFloor(newBuilding.floors[0]);
        }
    }
    const onDurationChange = (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setDuration(parseInt(value, 10));
    }

    const onRoomNumberChange = ({roomNumber}: { roomNumber: string }) => {
        setDetectedRoomNumber(roomNumber);
    }

    const onBookNowClick = (event: MouseEvent) => {
        event.preventDefault();
        createEvent(app.authProvider!, campus, building, floor, detectedRoomNumber, new Date(), duration);
    }

    return (
        <Paper className={classes.paper}>
            <CampusSelector
                row
                className={classes.inputGroup}
                value={campus.id}
                campuses={BLUEPRINT}
                onChange={onCampusChange}
            />
            <BuildingSelector
                row
                className={classes.inputGroup}
                value={building.id}
                buildings={campus.buildings}
                onChange={onBuildingChange}
            />

            <FloorSelector
                row
                className={classes.inputGroup}
                value={floor.id}
                floors={building.floors}
            />


            <DurationSelector
                row
                className={classes.inputGroup}
                value={duration.toString()}
                onChange={onDurationChange}
            />

            <RoomNumberScanner
                className={classes.inputGroup}
                onChange={onRoomNumberChange}
                value={detectedRoomNumber}
            />

            <Button
                fullWidth variant={"contained"}
                size={"large"}
                className={classes.bookNowButton}
                color={"primary"}
                startIcon={<EventAvailable/>}
                onClick={onBookNowClick}
            >Book Now</Button>
        </Paper>
    )
}
