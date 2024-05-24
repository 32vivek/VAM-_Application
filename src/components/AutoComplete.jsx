import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocmp = ({ name, label, size, required }) => {
    return (
        <Autocomplete
            renderInput={(params) => <TextField {...params} label={label} />}
            name={name}
            label={label}
            size={size}
            required={required}
        />
    );
}
export default Autocmp;
