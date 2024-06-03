import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { NavLink, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import ReusableTabs from '../../../components/Tabs';
import '../../page.css';

const UserProfile = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const defaultButton = location.pathname.split('/').pop() || 'today';
    const [activeButton, setActiveButton] = useState(defaultButton);
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        { label: 'Basic Details', route: '/userprofile' },
        { label: 'Edit User', route: '/userprofile/edituser' },
        { label: 'Reset Password', route: '/userprofile/resetpassword' },

    ];

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        navigate(tabs[newValue].route);
    };

    return (
        <>
            <Box style={{ marginTop: "2px" }} justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box>
                            <Typography variant="h6">My Profile</Typography>
                        </Box>
                        <hr />
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Box boxShadow={3} p={3} borderRadius={3} bgcolor="rgb(60,86,91)" display="flex" justifyContent="center" alignItems="center">
                            <img src='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=360' alt="User Profile" style={{ width: '100%', borderRadius: '50%' }} />
                        </Box>
                    </Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Box bgcolor="rgb(60,86,91)" display="flex">
                            <ReusableTabs
                                onChange={handleTabChange}
                                tabs={tabs}
                                selectedTab={selectedTab}
                            />
                        </Box>
                        <Box marginTop="15px">
                            <Outlet />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default UserProfile;
