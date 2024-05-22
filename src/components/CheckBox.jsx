import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';

const ReusableCheckbox = ({ label, options, onChange }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                {options.map((option) => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                onChange={(e) => onChange(e, option)}
                            />
                        }
                        label={option}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default ReusableCheckbox;
