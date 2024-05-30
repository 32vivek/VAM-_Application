import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Autocmp = ({ name, label, size, required, options, value, onChange }) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="standard"
                    required={required}
                    InputLabelProps={{ style: { color: 'black' } }}
                />
            )}
            size={size}
            value={value}
            onChange={(event, newValue) => onChange(name, newValue)}
        />

    );
};

export default Autocmp;
