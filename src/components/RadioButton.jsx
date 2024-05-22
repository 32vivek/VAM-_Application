import React from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";

const ReusableRadioButton = () => {
    return (
        <FormControl component="fieldset">
            <RadioGroup>
                <FormControlLabel />
            </RadioGroup>
        </FormControl>
    );
};

export default ReusableRadioButton;
