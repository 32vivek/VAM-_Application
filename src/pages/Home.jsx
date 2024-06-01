import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { NavLink, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/Button';
import ReusableTabs from '../components/Tabs';
import DatePickers from '../components/DateRangePicker';
import './page.css';
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

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box display="flex" gap="10px">
                            {/* <ReusableDatePicker label="From Date" size="small" /> */}
                            {/* <ReusableDatePicker label="To Date" size="small" /> */}
                            <DatePickers
                                // label="Select Date"
                                // selectedDate={startDate}
                                label="From Date"
                                placeholder="From Date"
                                // onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                            />
                            <DatePickers
                                label="To Date"
                                placeholder="To Date"
                                // selectedDate={startDate}
                                // onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy/MM/dd"
                            />
                            <ButtonComponent
                                name="Show Visitors"
                                size="small"
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white", fontSize: "10px" }}
                            />

                        </Box>
                    </Grid>
                    {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box>
                            <ButtonComponent
                                name="Show Visitors"
                                size="small"
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                            />
                        </Box>
                    </Grid> */}
                </Grid>
                <Box marginTop="30px">
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default Home;
