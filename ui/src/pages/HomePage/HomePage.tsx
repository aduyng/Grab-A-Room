import React from "react";
import Button from "@mui/material/Button";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <Button variant={"contained"} startIcon={<CameraAltOutlined/>} component={Link} to={"/scan"}>Scan Room
            Number</Button>
    )
}
