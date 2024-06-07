import { Grid, FormControl, Box, IconButton, Typography, Tooltip, SwipeableDrawer } from '@mui/material';
import { Search } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import Texxt from '../../components/Textfield';
import Autocmp from '../../components/AutoComplete';
import ButtonComponent from '../../components/Button';
import CustomDataTable from '../../components/ReactDataTable';
import axios from 'axios';
import { user_api } from '../../Api/Api';
import { Add, ExitToApp } from "@mui/icons-material";
import FloatingButton from '../../components/FloatingButton';
import { Close as CloseIcon } from '@mui/icons-material';
import ReusableCheckbox from '../../components/CheckBox';
import ReusableRadioButton from '../../components/RadioButton';
import { toast, ToastContainer, POSITION } from 'react-toastify';
import DatePickers from '../../components/DateRangePicker';
import CustomCheckbox from '../../components/CheckBox';
import colors from '../colors';

const departmentOptions = [
    { label: 'HR', value: 'hr' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
];

const purposeOptions = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Interview', value: 'interview' },
    { label: 'Delivery', value: 'delivery' },
];
const organizationOptions = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Interview', value: 'interview' },
    { label: 'Delivery', value: 'delivery' },
];

const visitorName = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Interview', value: 'interview' },
    { label: 'Delivery', value: 'delivery' },
];

const visitorMobile = [
    { label: 'Meeting', value: 'meeting' },
    { label: 'Interview', value: 'interview' },
    { label: 'Delivery', value: 'delivery' },
];

const employeeNameOptions = [
    { label: 'John Doe', value: 'john_doe' },
    { label: 'Jane Smith', value: 'jane_smith' },
    { label: 'Alice Johnson', value: 'alice_johnson' },
];

const data = [
    { label: 'John Doe', value: 'john_doe' },
    { label: 'Jane Smith', value: 'jane_smith' },
    { label: 'Alice Johnson', value: 'alice_johnson' },
];

const PreRequest = () => {
    const [open, setOpen] = useState(false);

    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [visitorsData, setVisitorsData] = useState([]);
    const [isExtendedPassRequestChecked, setIsExtendedPassRequestChecked] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        visitorName: null,
        visitorMobile: null,
        visitorEmail: '',
        visitorOrganization: null,
        purpose: null,
        address: "",
        possessionAllowed: '',
        confrenceRoom: '',
        laptop: '',
        mail: true,
        sms: true,
        pass: false,
    });

    const [formValues, setFormValues] = useState({
        fromDate: null,
        toDate: null
    });

    const floatingActionButtonOptions = [
        { label: 'Add', icon: <Add /> },
        // { label: 'Calender View', icon: <ExitToApp /> },
    ];
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

    const handleMoreFiltersClick = () => {
        setShowMoreFilters(!showMoreFilters);
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


    const toggleDrawer = (isOpen) => {
        setOpen(isOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };
    const handleExtendedPassRequestChange = (event) => {
        setIsExtendedPassRequestChecked(event.target.checked);
    };

    const handleChange = (name, value) => {
        if (name === 'pass') {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };




    const validateForm = () => {
        let formErrors = {};
        if (!formData.visitorOrganization) formErrors.visitorOrganization = 'Visitor Organization is required';
        if (!formData.visitorName) formErrors.visitorName = 'Visitor Name is required';
        if (!formData.visitorMobile) formErrors.visitorMobile = 'Visitor Mobile No is required';
        // if (!formData.visitorEmail) formErrors.visitorEmail = 'Visitor Email is required';
        if (!formData.purpose) formErrors.purpose = 'Purpose of Meeting is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log(formData, "Data");
            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
            setFormData({
                visitorName: null,
                visitorMobile: null,
                visitorEmail: '',
                visitorOrganization: null,
                purpose: null,
                address: "",
                possessionAllowed: '',
                confrenceRoom: '',
                laptop: '',
                mail: true,
                sms: true,
                pass: false,
            });
        } else {
            console.log("Validation Failed");
            toast.error("Validation Error! Please check the form for errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
        }
    };

    const handleReset = () => {
        setFormData({
            visitorName: null,
            visitorMobile: null,
            visitorEmail: '',
            visitorOrganization: null,
            purpose: null,
            address: "",
            possessionAllowed: '',
            confrenceRoom: '',
            laptop: '',
            mail: true,
            sms: true,
            pass: false,
        });
        // setFormErrors({});
    };
    const styles = {
        navbar: {
            backgroundColor: colors.navbar,
            color: '#fff',
            padding: '10px',
        },
        resetButton: {
            backgroundColor: colors.resetButtonBackground,
            color: colors.resetButtonColor,
            // padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };
    const addInstantVisitors = (
        <>
            <Box display="flex" justifyContent="space-between" backgroundColor={colors.navbar}  >
                <Typography color="white" style={{ marginLeft: "10px", marginTop: "10px" }}>Visitor Pre Request</Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>
            <Grid container spacing={1} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            name="visitorOrganization"
                            label="Visitor Organization"
                            size="small"
                            required
                            // variant="standard"
                            value={formData.visitorOrganization}
                            onChange={(value) => handleChange('visitorOrganization', value)}
                            options={organizationOptions}
                            error={errors.visitorOrganization}
                            helperText={errors.visitorOrganization}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            name="visitorName"
                            label="Visitor Name"
                            size="small"
                            required
                            // variant="standard"
                            value={formData.visitorName}
                            onChange={(value) => handleChange('visitorName', value)}
                            options={visitorName}

                            error={errors.visitorName}
                            helperText={errors.visitorName}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            name="visitorMobile"
                            label="Visitor Mobile No"
                            size="small"
                            required
                            // variant="standard"
                            value={formData.visitorMobile}
                            onChange={(value) => handleChange('visitorMobile', value)}
                            options={visitorMobile}
                            error={errors.visitorMobile}
                            helperText={errors.visitorMobile}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="visitorEmail"
                            size="small"
                            type="text"
                            // variant="standard"
                            label="Visitor Email"
                            placeholder="Enter Visitor Email Id"
                            value={formData.visitorEmail}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="address"
                            size="small"
                            type="text"
                            // variant="standard"
                            label="Visitor Address"
                            placeholder="Enter Visitor Address"
                            value={formData.address}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="possessionAllowed"
                            size="small"
                            type="text"
                            // variant="standard"
                            label="Possession Allowed"
                            placeholder="Enter Data"
                            value={formData.possessionAllowed}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            name="purpose"
                            label="Purpose of Meeting"
                            size="small"
                            // variant="standard"
                            options={purposeOptions}
                            value={formData.purpose}
                            onChange={(value) => handleChange('purpose', value)}
                            required
                            error={errors.purpose}
                            helperText={errors.purpose}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <DatePickers
                            label="To Date"
                            // name="fromDate"
                            placeholder="To Date"
                            value={formData.toDate}
                            handleInputChange={handleInputChange}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="laptop"
                            size="small"
                            type="text"
                            label="Laptop"
                            // variant="standard"
                            placeholder="Enter Data"
                            value={formData.laptop}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="confrenceRoom"
                            size="small"
                            type="text"
                            // variant="standard"
                            label="Confrence Room"
                            placeholder="Enter Data"
                            value={formData.confrenceRoom}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    {/* <Typography>Notify Employee</Typography> */}
                    <Box display="flex">
                        <Typography>Notify Employee</Typography>
                        <CustomCheckbox
                            label="Mail"
                            checked={formData.mail} onChange={(e) => handleChange('mail', e.target.checked)}
                        />
                        <CustomCheckbox
                            label="SMS"
                            checked={formData.sms} onChange={(e) => handleChange('sms', e.target.checked)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <CustomCheckbox
                            label="Extended Pass Request"
                            checked={formData.pass}
                            onChange={handleExtendedPassRequestChange}
                        />
                        {isExtendedPassRequestChecked && (
                            <DatePickers
                                label="To Date"
                                // name="fromDate"
                                placeholder="To Date"
                                value={formData.toDate}
                                handleInputChange={handleInputChange}
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={6} md={6} xs={12}>
                    <Box sx={{ display: "flex", ml: "25px", mb: "20px", flexDirection: "row", gap: "20px" }}>
                        <Box>
                            <ButtonComponent
                                name="Submit"
                                size="small"
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                                backgroundColor={colors.navbar}
                            // style={{ backgroundColor: "rgb(60,86,91)", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Reset"
                                size="small"
                                variant="contained"
                                onClick={handleReset}
                                style={styles.resetButton}
                            // style={{ backgroundColor: "rgb(60,86,91)", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Cancel"
                                size="small"
                                onClick={handleCloseDrawer}
                                style={{ backgroundColor: "red", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>

    );
    const handleAddVisitorClick = () => {
        setOpen(true);
    };
    const handleAutocompleteChange = (value) => {
        console.log("Selected value:", value);
        // Handle the selected value here
    };


    return (
        <>
            <ToastContainer style={{ marginTop: '45px' }} />
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ width: '600px', marginTop: "63px" }}>
                    {addInstantVisitors}
                </Box>

            </SwipeableDrawer>
            <Box backgroundColor={colors.navbar}>
                <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>Visitors Pre Request</Typography>
                {/* <hr style={{ marginTop: "-0px", height: "4px", borderWidth: "0", color: "rgb(60,86,91)", backgroundColor: "rgb(60,86,91)" }} /> */}
            </Box>
            <Grid container spacing={3} >


                <Grid item lg={5} md={5} sm={12} xs={12} style={{ marginTop: "4px" }}>
                    {/* <Box boxShadow={3} padding={2} borderRadius={2}> */}
                    <Box>
                        <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                            <Texxt placeholder="Enter Data" label="Search Visitors Activity" size="small" />
                            {/* <IconButton color="primary">
                                <Search />
                            </IconButton> */}
                        </Box>
                        <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
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
                                        <Autocmp size="small" label="Pending" options={data}
                                            onChange={(event, value) => handleAutocompleteChange(value)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="Purpose" options={data}
                                            onChange={(event, value) => handleAutocompleteChange(value)}
                                        />
                                    </FormControl>
                                </Box>

                            </>
                        )}
                        <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                            <ButtonComponent backgroundColor={colors.navbar} variant="contained" style={{ textTransform: "none", borderRadius: "8px", fontSize: "12px" }} size="small" name="Submit" />
                            <ButtonComponent backgroundColor={colors.navbar} variant="contained"
                                style={{ textTransform: "none", borderRadius: "8px", fontSize: "10px" }}
                                name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                onClick={handleMoreFiltersClick}
                                size="medium"
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12}>
                    <Box borderRadius={2} mt="10px">
                        <Box display="flex" flexDirection="row" gap="20px">
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="center" alignItems="center" backgroundColor="#413839" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Pending</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#007C80" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Done</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="rgb(37,65,23)" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Rescheduled</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" gap="20px" mt="20px">
                            <Box width="50%" borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#FF4500" color="white">
                                <Typography variant="body1" mt="10px" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Cancelled</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#AA6C39" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center" fontSize="12px">Missed</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1" fontSize="12px">0</Typography></Box>
                            </Box>
                            {/* <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#800000" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Rejected</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box boxShadow={3} borderRadius={2} backgroundColor={colors.navbar} height="35px" borderWidth="0">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography ml="10px" mt="8px" variant="h10" fontSize="10px" color="white">Filtered By : </Typography>
                            {/* <Typography mr="10px" variant="h10" color="white">Count = 0 </Typography> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" boxShadow={3} padding={2} borderRadius={2} bgcolor='white'>
                        <CustomDataTable columns={columns} filteredData={filteredData} onSearch={handleSearch}
                        />
                    </Box>
                </Grid>
                <FloatingButton options={floatingActionButtonOptions} bottomOffset="100px" onButtonClick={handleAddVisitorClick} />
            </Grid>
        </>
    )
}

export default PreRequest;
