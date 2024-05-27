import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { NavLink, Outlet, useLocation, Navigate } from 'react-router-dom';
import ButtonComponent from '../components/Button';
import ReusableDatePicker from '../components/DateRangePicker';

const Home = () => {
    const location = useLocation();
    const defaultButton = location.pathname.split('/').pop() || 'today';
    const [activeButton, setActiveButton] = useState(defaultButton);

    useEffect(() => {
        if (location.pathname === '/home') {
            setActiveButton('today');
        } else {
            setActiveButton(location.pathname.split('/').pop());
        }
    }, [location]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <>
            {location.pathname === '/home' && <Navigate to="/home/today" replace />}

            <Box style={{ marginTop: "20px" }} justifyContent="center" alignItems="center">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box display="flex" gap="20px">
                            <NavLink
                                to="/home/today"
                                style={{
                                    textDecoration: activeButton === 'today' ? 'underline' : 'none',
                                    fontWeight: activeButton === 'today' ? 'bold' : 'normal',
                                    color: activeButton === 'today' ? 'blue' : 'inherit',
                                }}
                                onClick={() => handleButtonClick('today')}
                            >
                                <ButtonComponent
                                    style={{
                                        backgroundColor: activeButton === 'today' ? 'rgb(60,86,91)' : 'inherit',
                                        color: activeButton === 'today' ? 'white' : 'black'
                                    }}
                                    name="Today"
                                />
                            </NavLink>
                            <NavLink
                                to="/home/week"
                                style={{
                                    textDecoration: activeButton === 'week' ? 'underline' : 'none',
                                    fontWeight: activeButton === 'week' ? 'bold' : 'normal',
                                    color: activeButton === 'week' ? 'blue' : 'inherit',
                                }}
                                onClick={() => handleButtonClick('week')}
                            >
                                <ButtonComponent
                                    style={{
                                        backgroundColor: activeButton === 'week' ? 'rgb(60,86,91)' : 'inherit',
                                        color: activeButton === 'week' ? 'white' : 'black'
                                    }}
                                    name="This Week"
                                />
                            </NavLink>
                            <NavLink
                                to="/home/month"
                                style={{
                                    textDecoration: activeButton === 'month' ? 'underline' : 'none',
                                    fontWeight: activeButton === 'month' ? 'bold' : 'normal',
                                    color: activeButton === 'month' ? 'blue' : 'inherit',
                                }}
                                onClick={() => handleButtonClick('month')}
                            >
                                <ButtonComponent
                                    style={{
                                        backgroundColor: activeButton === 'month' ? 'rgb(60,86,91)' : 'inherit',
                                        color: activeButton === 'month' ? 'white' : 'black'
                                    }}
                                    name="This Month"
                                />
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box display="flex" gap="20px">
                            <ReusableDatePicker label="From Date" />
                            <ReusableDatePicker label="To Date" />
                            <ButtonComponent
                                name="Show Visitor"
                                size="large"
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box marginTop="40px">
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default Home;
