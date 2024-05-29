import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

const ReusableRadioButton = ({ label, options, defaultValue, onChange }) => {
    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: "black" }}>{label}</FormLabel>
            <RadioGroup aria-label={label} name={label} defaultValue={defaultValue} onChange={handleChange}>
                <Grid container spacing={2}>
                    {options.map((option, index) => (
                        <Grid item key={index}>
                            <FormControlLabel
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
        </FormControl>
    );
};

export default ReusableRadioButton;
