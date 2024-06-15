import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, IconButton, Tooltip, SwipeableDrawer, Divider } from '@mui/material';
import Texxt from '../../components/Textfield';
import ReusableDatePicker from '../../components/DateRangePicker';
import ButtonComponent from '../../components/Button';
import ReusablePieChart from '../../components/PieChart';
import Autocmp from '../../components/AutoComplete';
import CustomDataTable from '../../components/ReactDataTable';
import { user_api } from '../../Api/Api';
import axios from 'axios';
import { SaveAlt, FileCopy, Add, ExitToApp, Print } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import FloatingButton from '../../components/FloatingButton';
import ReusableTabs from '../../components/Tabs';
import { Outlet, useNavigate } from 'react-router-dom';
import { Close as CloseIcon } from '@mui/icons-material';
import DatePickers from '../../components/DateRangePicker';
import colors from '../colors';

const data1 = [
    { label: 'IN', value: 200, color: '#0088FE' },
    { label: 'Total', value: 300, color: '#00C49F' },
];

const data = [
    { label: 'IN', value: 200, color: '#0088FE' },
    { label: 'Total', value: 300, color: '#00C49F' },
];

const VehicleEntry = () => {

    const [open, setOpen] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [visitorsData, setVisitorsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormValues] = useState({
        dateWise: null,
        fromDate: null,
        toDate: null
    });
    const toggleDrawer = (isOpen) => {
        setOpen(isOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };
    const handleMoreFiltersClick = () => {
        setShowMoreFilters(!showMoreFilters);
    };

    const columns = [
        {
            name: 'Select',
            selector: 'select',
            cell: (row) => <input type="checkbox" checked={row.selected} onChange={() => handleRowSelected(row)} />,
            sortable: false,
        },
        { name: 'name', selector: row => row.name, sortable: true },
        { name: 'email', selector: row => row.email, sortable: true },
        { name: 'number', selector: row => row.number, sortable: true },
        { name: 'address', selector: row => row.address, sortable: true },
        { name: 'department', selector: row => row.department, sortable: true },
        { name: 'number', selector: row => row.number, sortable: true },
    ];

    const floatingActionButtonOptions = [
        { label: 'Visitor Entry', icon: <Add /> },
        // { label: 'Visitor Exit', icon: <ExitToApp /> },
        // { label: 'Re-print', icon: <Print /> }
    ];

    const tabs = [
        { label: 'With Material', route: '/startingup/vehicleentry' },
        { label: 'Without Material', route: '/startingup/vehicleentry/out' },
        { label: 'Reporting', route: '/startingup/vehicleentry/reporting' }

    ];
    const styles = {
        navbar: {
            backgroundColor: colors.navbar,
            color: '#fff',
            padding: '10px',
        },
        resetButton: {
            backgroundColor: colors.resetButtonBackground,
            color: colors.resetButtonColor,
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(user_api);
            setVisitorsData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (searchText) => {
        const filtered = visitorsData.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleRowSelected = (row) => {
        const updatedData = filteredData.map((item) =>
            item === row ? { ...item, selected: true } : { ...item, selected: false }
        );
        setFilteredData(updatedData);
    };


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "VisitorsData");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "VisitorsData.xlsx");
    };

    const copyTableData = () => {
        const dataString = filteredData.map(item => Object.values(item).join('\t')).join('\n');
        navigator.clipboard.writeText(dataString);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        navigate(tabs[newValue].route);
    };

    const handleAutocompleteChange = (value) => {
        console.log("Selected value:", value);
        // Handle the selected value here
    };


    const addInstantVisitors = (
        <Box component="form" sx={{ mt: "63px", }}>
            {/* <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon />
                </IconButton>
            </Box> */}
            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box display="flex" justifyContent="space-between" style={{ marginLeft: "10px" }}>
                    <Typography variant="h5">ADD VISITORS</Typography>
                    <IconButton onClick={handleCloseDrawer}>
                        <CloseIcon style={{ color: "black" }} />
                    </IconButton>
                </Box>
            </Grid> */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box display="flex" justifyContent="space-between" backgroundColor={colors.navbar}  >
                    <ReusableTabs
                        tabs={tabs}
                        selectedTab={selectedTab}
                        onChange={handleTabChange}
                    />
                    <IconButton onClick={handleCloseDrawer}>
                        <CloseIcon style={{ color: "white" }} />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box>
                    <Outlet />
                </Box>
            </Grid>


        </Box>

    );

    const handleFormClick = () => {
        setOpen(true);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };


    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ width: '600px' }}>
                    {addInstantVisitors}
                </Box>

            </SwipeableDrawer>

            <Box backgroundColor={colors.navbar}>
                <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>Vehicle Entry</Typography>
                {/* <hr style={{ marginTop: "-0px", height: "4px", borderWidth: "0", color: "rgb(60,86,91)", backgroundColor: "rgb(60,86,91)" }} /> */}
            </Box>

            <Grid container spacing={1}>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex">
                        <Typography variant="h5">Visitors Activity</Typography>
                    </Box>
                    <hr width="100%" />
                </Grid> */}

                <Grid item lg={4} md={4} sm={12} xs={12} style={{ marginTop: "8px" }}>
                    <Box  >
                        <Box >
                            <Texxt placeholder="Enter Data" label="Search Visitors Activity" size="small" fullWidth onChange={(e) => handleSearch(e.target.value)} />
                        </Box>

                        <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                            {/* <ReusableDatePicker label="From Date" />
                            <ReusableDatePicker label="To Date" /> */}
                            <DatePickers
                                label="From Date"
                                // name="fromDate"
                                placeholder="From Date"
                                value={formData.fromDate}
                                handleInputChange={handleInputChange}
                            />
                            <DatePickers
                                label="To Date"
                                // name="fromDate"
                                placeholder="To Date"
                                value={formData.toDate}
                                handleInputChange={handleInputChange}
                            />
                        </Box>
                        {showMoreFilters && (
                            <>
                                <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="In" options={data}
                                            onChange={(event, value) => handleAutocompleteChange(value)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="Purpose" options={data}
                                            onChange={(event, value) => handleAutocompleteChange(value)}
                                        />
                                    </FormControl>
                                </Box>
                                <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="Request Status" options={data}
                                            onChange={(event, value) => handleAutocompleteChange(value)}
                                        />
                                    </FormControl>
                                </Box>
                            </>
                        )}
                        <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                            <ButtonComponent backgroundColor={colors.navbar} style={{ borderRadius: "8px", fontSize: "12px", textTransform: "none", p: '4px', color: "white" }}
                                name="Submit" size="small"
                                variant="contained"
                            />
                            <ButtonComponent
                                // style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                onClick={handleMoreFiltersClick}
                                size="small"
                                variant="contained"
                                backgroundColor={colors.navbar}
                                style={{ borderRadius: "8px", fontSize: "12px", textTransform: "none", p: '4px', color: "white" }}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                    {/* <Box display="flex" justifyContent="center" alignItems="center"  >
                        <ReusablePieChart data={data1} outerRadius={80} width={200} height={200} legendHidden={false} />
                    </Box> */}
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box mt="10px">
                        <Box display="flex" flexDirection="row" gap="20px">
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="center" alignItems="center" backgroundColor="#413839" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px" >Visitors in</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#AA6C39" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Visitor out</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="rgb(37,65,23)" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Total visitors</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" gap="20px" mt="20px">
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="rgb(71,56,16)" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Pending</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="rgb(3,62,62)" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Approved</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#FF4500" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Rejected</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "10px" }}>
                    <Box width="100%" bgcolor={colors.navbar}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography ml="10px" variant="h10" color="white">Filtered By : </Typography>
                            {/* <Typography variant="h10" color="white">Count = {filteredData.length} </Typography> */}
                            <Box display="flex" alignItems="center">
                                <Tooltip title="Export to Excel">
                                    <IconButton onClick={exportToExcel} style={{ color: 'white' }}>
                                        <SaveAlt />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Copy Data">
                                    <IconButton onClick={copyTableData} style={{ color: 'white' }}>
                                        <FileCopy />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" boxShadow={3} padding={2} borderRadius={2} bgcolor='white'>
                        <CustomDataTable columns={columns} filteredData={filteredData} onSearch={handleSearch}
                        />
                    </Box>
                </Grid>
                <FloatingButton options={floatingActionButtonOptions} bottomOffset="100px" onButtonClick={handleFormClick} />
            </Grid>

        </>
    );
};

export default VehicleEntry;

