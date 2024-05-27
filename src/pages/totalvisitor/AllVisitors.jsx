import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import ReusableDatePicker from '../../components/DateRangePicker';
import ButtonComponent from '../../components/Button';
import Autocmp from '../../components/AutoComplete';

const data = [
    { name: 'Date 1', IN: 249, OUT: 150 },
];

const VisitorStatus = () => {
    const location = useLocation();
    const totalIn = data.reduce((acc, curr) => acc + curr.IN, 0);
    const totalOut = data.reduce((acc, curr) => acc + curr.OUT, 0);
    const totalSum = totalIn + totalOut;

    const [activeButton, setActiveButton] = useState('Status');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const dateOptions = ["Date Wise", "Monthly", "Quarterly", "Weekly", "Yearly"];

    return (
        <>
            {location.pathname === '/dashboard/visitorsstatus' && <Navigate to="/dashboard/visitorsstatus/status" replace />}
            <Grid container spacing={1} mt="15px">
                <Grid item lg={3} md={3} sm={6} xs={6}>
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
                <Grid item lg={3} md={3} sm={6} xs={6}>
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
                        <Box>
                            <NavLink to="/dashboard/visitorsstatus/status">
                                <ButtonComponent
                                    name="Status"
                                    style={{
                                        color: activeButton === 'Status' ? "rgb(25,118,210)" : "white",
                                        fontWeight: activeButton === 'Status' ? 'bold' : 'normal'
                                    }}
                                    onClick={() => handleButtonClick('Status')}
                                />
                            </NavLink>
                        </Box>
                        <Box>
                            <NavLink to="/dashboard/visitorsstatus/purpose">
                                <ButtonComponent
                                    name="Purpose"
                                    style={{
                                        color: activeButton === 'Purpose' ? "rgb(25,118,210)" : "white",
                                        fontWeight: activeButton === 'Purpose' ? 'bold' : 'normal'
                                    }}
                                    onClick={() => handleButtonClick('Purpose')}
                                />
                            </NavLink>
                        </Box>
                        <Box>
                            <NavLink to="/dashboard/visitorsstatus/department">
                                <ButtonComponent
                                    name="Department"
                                    style={{
                                        color: activeButton === 'Department' ? "rgb(25,118,210)" : "white",
                                        fontWeight: activeButton === 'Department' ? 'bold' : 'normal'
                                    }}
                                    onClick={() => handleButtonClick('Department')}
                                />
                            </NavLink>
                        </Box>
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
