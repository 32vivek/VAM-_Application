import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Texxt = ({ name, size, label, type, placeholder, required, multiline, rows, error, helperText, onChange, value }) => {
    return (
        <FormControl fullWidth>
            <TextField
                name={name}
                size={size}
                label={label}
                type={type}
                placeholder={placeholder}
                required={required}
                rows={rows}
                multiline={multiline}
                error={!!error}
                helperText={helperText}
                onChange={onChange}
                value={value}
                InputLabelProps={{
                    style: { color: 'black' }
                }}
            />
        </FormControl>
    );
};

export default Texxt;
