import React, {ChangeEvent, useEffect, useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import {useDebounce} from "use-debounce";

export type RoomNumberInputProps = {
    className: string;
    value: string;
    disabled: boolean;
    onChange: (value: string) => void
}

export default function RoomNumberInput({className, value, disabled, onChange}: RoomNumberInputProps) {
    const [text, setText] = useState<string>(value || "");
    const [term] = useDebounce(text, 300);

    const onRoomNumberChange = (event: ChangeEvent) => {
        const newText = (event.target as HTMLInputElement).value;
        setText(newText);
    }

    useEffect(() => {
        setText(value)
    }, [value]);

    useEffect(() => {
        onChange(term);
    }, [term, onChange]);

    return (
        <FormControl variant="outlined" fullWidth className={className}>
            <InputLabel>Room Number</InputLabel>
            <OutlinedInput
                value={text}
                onChange={onRoomNumberChange}
                disabled={disabled}
                label="Room Number"
            />
        </FormControl>
    )
}
