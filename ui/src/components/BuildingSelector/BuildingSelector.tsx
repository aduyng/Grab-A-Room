import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {Building} from "../../consts";
import map from "lodash/map";

export interface BuildingSelectorProps extends RadioGroupProps {
    buildings: Building[]
}

export default function BuildingSelector({onChange, value, buildings, className, ...rest}: BuildingSelectorProps) {
    return (
        <FormControl component="fieldset" className={className}>
            <FormLabel component="legend">Building</FormLabel>
            <RadioGroup
                onChange={onChange}
                value={value}
                {...rest}
            >
                {map(buildings, building => {
                    return (
                        <FormControlLabel key={building.id} value={building.id} control={<Radio/>} label={building.name}/>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
