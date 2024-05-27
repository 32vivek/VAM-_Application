import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
        fontSize: theme.typography.body2.fontSize, // Set font size to match body2 font size
        padding: theme.spacing(0.25, 0.5), // Set smaller padding
        boxSizing: 'border-box', // Ensure box-sizing is border-box
        height: '40px', // Adjust the height
    },
    '& input': {
        width: 'calc(100% - 12px)', // Adjusted width to accommodate padding
        overflow: 'hidden', // Hide any overflow text
        textOverflow: 'ellipsis', // Use ellipsis for overflow text
    },
}));

export default function ReusableDatePicker({ label, ...props }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                {/* <Label componentName={label || "DatePicker"} valueType="date" /> */}
                <SmallDatePicker label={label} size="small" variant="standard" {...props} />
            </div>
        </LocalizationProvider>
    );
}
