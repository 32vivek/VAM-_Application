import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { NavLink, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/Button';
import ReusableDatePicker from '../components/DateRangePicker';
import ReusableTabs from '../components/Tabs';
const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const defaultButton = location.pathname.split('/').pop() || 'today';
    const [activeButton, setActiveButton] = useState(defaultButton);
    const [selectedTab, setSelectedTab] = useState(0);
    useEffect(() => {
        if (location.pathname === '/home') {
            setActiveButton('today');
        } else {
            setActiveButton(location.pathname.split('/').pop());
        }
    }, [location]);

    const tabs = [
        { label: 'Today', route: '/home/today' },
        { label: 'This Week', route: '/home/week' },
        { label: 'This Month', route: '/home/month' }
    ];

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        // Navigate to the selected tab's route
        navigate(tabs[newValue].route); // Use navigate instead of history.push
    };

    return (
        <>
            {location.pathname === '/home' && <Navigate to="/home/today" replace />}

            <Box style={{ marginTop: "20px" }} justifyContent="center" alignItems="center">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box backgroundColor="rgb(60,86,91)" display="flex">
                            <ReusableTabs
                                onChange={handleTabChange}
                                tabs={tabs}
                                selectedTab={selectedTab}
                            />
                        </Box>
                        {/* <Box display="flex" gap="10px">
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
                        </Box> */}
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box display="flex" gap="20px">
                            <ReusableDatePicker label="From Date" size="small" />
                            <ReusableDatePicker label="To Date" size="small" />
                            {/* <ButtonComponent
                                name="Show Visitors"
                                size="small"
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                            /> */}
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box>
                            <ButtonComponent
                                name="Show Visitors"
                                size="medium"
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                            />
                        </Box>

                    </Grid>
                </Grid>
                <Box marginTop="30px">
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default Home;
