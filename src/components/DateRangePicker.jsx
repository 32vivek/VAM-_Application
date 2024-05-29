import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl } from '@mui/material';

const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong> for {valueType} editing
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a
                        href="https://mui.com/x/introduction/licensing/#pro-plan"
                        aria-label="Included on Pro package"
                    >
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}

const SmallDatePicker = styled(DatePicker)(({ theme }) => ({
    '& .MuiInputBase-root': {
        height: '25px', // Adjust the height here
        fontSize: theme.typography.body2.fontSize,
        padding: theme.spacing(3.0),
        boxSizing: 'border-box',
        // width: "auto"
    },
    '& .MuiFormLabel-root': {
        color: 'black', // Change the label color to black
    },
    // '& input': {
    //     padding: '35px', // Adjust padding for input text
    //     height: '35px', // Ensure the input takes full height
    // },
}));

export default function ReusableDatePicker({ label, ...props }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
                <SmallDatePicker label={label} size="small" variant="standard" {...props} />
            </FormControl>
        </LocalizationProvider>
    );
}
