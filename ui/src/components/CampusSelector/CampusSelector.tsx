import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {Campus} from "../../consts";
import map from "lodash/map";

export interface CampusSelectorProps extends RadioGroupProps {
    campuses: Campus[]
}

export default function CampusSelector({onChange, value, campuses, className, ...rest}: CampusSelectorProps) {
    return (
        <FormControl component="fieldset" className={className}>
            <FormLabel component="legend">Campus</FormLabel>
            <RadioGroup
                onChange={onChange}
                value={value}
                {...rest}
            >
                {map(campuses, campus => {
                    return (
                        <FormControlLabel key={campus.id} value={campus.id} control={<Radio/>} label={campus.name}/>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
