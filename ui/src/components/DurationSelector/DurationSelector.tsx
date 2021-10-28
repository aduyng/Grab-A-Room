import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup, {RadioGroupProps} from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {RESERVE_DURATIONS} from "../../consts";
import map from "lodash/map";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";

const useStyles = makeStyles((theme: Theme) => createStyles({
    radio: {
        width: "50%",
        marginRight: theme.spacing(1)
    }
}));

interface DurationSelectorProps extends RadioGroupProps {
    disabled: boolean;
}

export default function DurationSelector({onChange, value, className, disabled, ...rest}: DurationSelectorProps) {
    const classes = useStyles();
    return (
        <FormControl component="fieldset" className={className}>
            <FormLabel component="legend">Meeting Duration</FormLabel>
            <RadioGroup
                onChange={onChange}
                value={value}
                {...rest}
            >
                {map(RESERVE_DURATIONS, minutes => {
                    return (
                        <FormControlLabel
                            key={minutes.toString()}
                            className={classes.radio}
                            disabled={disabled}
                            value={minutes} control={<Radio/>} label={formatDuration(intervalToDuration({
                            start: 0,
                            end: minutes * 60 * 1000
                        }), {format: ['hours', 'minutes']})}/>
                    )
                })}
            </RadioGroup>
        </FormControl>
    )
}
