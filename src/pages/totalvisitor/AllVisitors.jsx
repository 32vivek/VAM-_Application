import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import ReusableDatePicker from '../../components/DateRangePicker';
import ButtonComponent from '../../components/Button';
import Autocmp from '../../components/AutoComplete';
import ReusableTabs from '../../components/Tabs';
const data = [
    { name: 'Date 1', IN: 249, OUT: 150 },
];

const VisitorStatus = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate instead of useHistory
    const totalIn = data.reduce((acc, curr) => acc + curr.IN, 0);
    const totalOut = data.reduce((acc, curr) => acc + curr.OUT, 0);
    const totalSum = totalIn + totalOut;

    const [activeButton, setActiveButton] = useState('Status');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const tabs = [
        { label: 'Status', route: '/dashboard/visitorsstatus/status' },
        { label: 'Purpose', route: '/dashboard/visitorsstatus/purpose' },
        { label: 'Department', route: '/dashboard/visitorsstatus/department' }
    ];
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        // Navigate to the selected tab's route
        navigate(tabs[newValue].route); // Use navigate instead of history.push
    };

    const dateOptions = ["Date Wise", "Monthly", "Quarterly", "Weekly", "Yearly"];

    return (
        <>
            {location.pathname === '/dashboard/visitorsstatus' && <Navigate to="/dashboard/visitorsstatus/status" replace />}
            <Grid container spacing={1} mt="15px">
                <Grid item lg={5} md={5} sm={6} xs={6}>
                    <Autocmp
                        name="Date Wise"
                        size="small"
                        label="Date Wise"
                        options={dateOptions}
                    />
                    <Box display="flex" gap="5px" mt="8px">
                        <ReusableDatePicker label="From Date" />
                        <ReusableDatePicker label="To Date" />
                    </Box>
                </Grid>
                <Grid item lg={5} md={5} sm={6} xs={6}>
                    <Box mt="20px">
                        <ButtonComponent
                            name="Search"
                            variant="contained"
                            style={{ backgroundColor: "rgb(60,86,91)", color: "white", marginLeft: "10px" }}
                        />
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: "20px" }}>
                    <Box backgroundColor="rgb(60,86,91)" display="flex" justifyContent="center" alignItems="center" gap="30px">
                        <ReusableTabs
                            onChange={handleTabChange}
                            tabs={tabs}
                            selectedTab={selectedTab}
                        />
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Box marginTop="5px">
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VisitorStatus;
