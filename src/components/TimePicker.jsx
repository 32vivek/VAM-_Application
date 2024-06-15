import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import as named export

const ReusableTimePicker = ({ label, value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={label}
                value={value}
                size="small"
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                ampm={false}
            />
        </LocalizationProvider>
    );
};

export default ReusableTimePicker;
