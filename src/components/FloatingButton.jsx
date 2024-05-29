import React from 'react';
import { Fab } from '@mui/material';

const FloatingButton = ({ options, bottomOffset, onAddVisitorClick }) => {
    return (
        <div style={{ position: 'fixed', bottom: bottomOffset || '20px', right: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: '999' }}>
            {options.map((option, index) => (
                <Fab
                    key={index}
                    color="primary"
                    aria-label={option.label}
                    style={{ marginBottom: '10px', fontSize: '12px', width: '36px', height: '36px' }}
                    onClick={onAddVisitorClick}
                >
                    {option.icon}
                </Fab>
            ))}
        </div>
    );
};

export default FloatingButton;
