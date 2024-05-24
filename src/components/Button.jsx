import React from 'react';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

const ButtonComponent = ({ name, size, color, onClick, style }) => {
    return (
        <FormControl>
            <Button
                variant="contained"
                size={size}
                color={color}
                onClick={onClick}
                style={style}
                sx={{ borderRadius: "12px" }}
            >
                {name}
            </Button>

        </FormControl>
    );
};

export default ButtonComponent;
