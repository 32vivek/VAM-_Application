import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FormIcon from '@mui/icons-material/Description';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
}));

export default function FloatingActionButtons({ onFormClick }) {
    const actions = [
        { icon: <FormIcon fontSize="medium" style={{ color: "#A74AC7" }} />, name: 'Form' },
        { icon: <UploadIcon fontSize="medium" style={{ color: "#A74AC7" }} />, name: 'Upload' },
        { icon: <DownloadIcon fontSize="medium" style={{ color: "#A74AC7" }} />, name: 'Download' },
    ];

    return (
        <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <StyledSpeedDial
                ariaLabel="SpeedDial example"
                icon={<SpeedDialIcon />}
                direction="left"
            >

                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                            if (action.name === 'Form') {
                                onFormClick();
                            } else {
                                console.log(`${action.name} clicked`);
                            }
                        }}
                        sx={{ color: '#fff' }} // Change icon color
                    />
                ))}
            </StyledSpeedDial>
        </Box>
    );
}
