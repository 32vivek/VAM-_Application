import { Grid, Typography, Box, Divider } from '@mui/material';
import React from 'react';
import ButtonComponent from '../../../components/Button';
import { Outlet, useNavigate } from 'react-router-dom';

const BasicDetails = () => {
    return (
        <>
            <Box boxShadow={3} p={2} borderRadius={3} bgcolor="#ffffff">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Name:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">Ramesh</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Communication Name:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">Ramesh's Communication Name</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Employee ID:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">123456</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Mobile No:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">+1234567890</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Email ID:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">ramesh@example.com</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Department:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">Engineering</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Username:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">ramesh123</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Created On:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">2022-01-01</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>
                                <Typography variant="body1" fontSize="12px">Organization Name:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" fontSize="12px">ABC Corp</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default BasicDetails;
