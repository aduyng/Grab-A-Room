import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import map from "lodash/map";
import {Floor} from "../../consts";

export interface FloorSelectorProps extends RadioGroupProps {
    floors: Floor[]
}

export default function FloorSelector({onChange, value, floors, className, ...rest}: FloorSelectorProps) {
    return (
        <FormControl component="fieldset" className={className}>
            <FormLabel component="legend">Building</FormLabel>
            <RadioGroup
                onChange={onChange}
                value={value}
                {...rest}
            >
                {map(floors, floor => {
                    return (
                        <FormControlLabel key={floor.id} value={floor.id} control={<Radio/>} label={floor.name}/>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
