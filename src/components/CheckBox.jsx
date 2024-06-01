import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';

const ReusableCheckbox = ({ label, options, onChange }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: 'black', fontSize: "12px" }}>{label}</FormLabel>
            <FormGroup row>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                onChange={(e) => onChange(e, option.value)}
                            />
                        }
                        label={option.label}
                        style={{ fontSize: "12px" }}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default ReusableCheckbox;
