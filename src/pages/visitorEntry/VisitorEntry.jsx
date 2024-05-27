import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Texxt from '../../components/Textfield';
import ReusableDatePicker from '../../components/DateRangePicker';
import ButtonComponent from './../../components/Button';
import ReusablePieChart from '../../components/PieChart';

const data1 = [
    { label: 'IN', value: 200, color: '#0088FE' },
    { label: 'Total', value: 300, color: '#00C49F' },
];

const VisitorActivity = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant='h5'>
                            Visitor Activity
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box>
                        <Box>
                            <Texxt
                                placeholder="Search"
                                label="Search"
                                size="small"
                            />
                        </Box>
                        <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                            <ReusableDatePicker label="From Date" />
                            <ReusableDatePicker label="To Date" />
                        </Box>
                        <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                            <ButtonComponent
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name="Submit"
                            />
                            <ButtonComponent
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name="More Filters"
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <ReusablePieChart data={data1} outerRadius={80} width={200} height={200} legendHidden={false} />
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box>
                        <Box>
                            <Texxt
                                placeholder="Search"
                                label="Search"
                                size="small"
                            />
                        </Box>
                        <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                            <ReusableDatePicker label="From Date" />
                            <ReusableDatePicker label="To Date" />
                        </Box>
                        <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                            <ButtonComponent
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name="Submit"
                            />
                            <ButtonComponent
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name="More Filters"
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default VisitorActivity;
