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
        notifyEmployee: []
    });

    const floatingActionButtonOptions = [
        { label: 'Add', icon: <Add /> },
        { label: 'Calender View', icon: <ExitToApp /> },
    ];
    const columns = [
        {
            name: 'Select',
            selector: 'select',
            cell: (row) => <input type="checkbox" checked={row.selected} onChange={() => handleRowSelected(row)} />,
            sortable: false,
        },
        { name: 'Name', selector: row => row.Name, sortable: true },
        { name: 'Email', selector: row => row.Email, sortable: true },
        { name: 'Number', selector: row => row.Number, sortable: true },
        { name: 'Address', selector: row => row.Address, sortable: true },
        { name: 'Department', selector: row => row.Department, sortable: true },
        { name: 'Number', selector: row => row.Number, sortable: true },
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
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
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
                    backgroundColor: 'rgb(60,86,91)',
                },
            });
        } else {
            console.log("Validation Failed");
            toast.error("Validation Error! Please check the form for errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                },
            });
        }
    };
    const addInstantVisitors = (
        <>
            <Box display="flex" justifyContent="space-between" backgroundColor="rgb(60,86,91)"  >
                <Typography color="white" style={{ marginLeft: "10px", marginTop: "10px" }}>Visitor Pre Request</Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "red", marginRight: "10px" }} />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            name="visitorOrganization"
                            label="Visitor Organization"
                            size="small"
                            required
                            value={formData.visitorOrganization}
                            onChange={(e, value) => handleChange('visitorOrganization', value)}
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
                            value={formData.visitorName}
                            onChange={(e, value) => handleChange('visitorName', value)}
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
                            value={formData.visitorMobile}
                            onChange={(e, value) => handleChange('visitorMobile', value)}
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
                            options={purposeOptions}
                            value={formData.purpose}
                            onChange={(e, value) => handleChange('purpose', value)}
                            required
                            error={errors.purpose}
                            helperText={errors.purpose}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <DatePickers
                            placeholder="From Date" />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="laptop"
                            size="small"
                            type="text"
                            label="Laptop"
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
                            label="Confrence Room"
                            placeholder="Enter Data"
                            value={formData.confrenceRoom}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <ReusableCheckbox
                            label="Notify Employee"
                            options={[
                                { label: "Mail", value: "mail" },
                                { label: "SMS", value: "sms" }
                            ]}
                            onChange={(value) => console.log("Selected options:", value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <ReusableCheckbox
                            label="Extended Pass Request"
                            options={[
                                { label: "Yes", value: "yes" }
                            ]}
                            onChange={handleExtendedPassRequestChange}

                        />
                        {isExtendedPassRequestChecked && (
                            <DatePickers
                                placeholder="Till Date" />
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={6} md={6} xs={12}>
                    <Box sx={{ display: "flex", ml: "25px", flexDirection: "row", gap: "20px" }}>
                        <Box>
                            <ButtonComponent
                                name="Submit"
                                size="medium"
                                type="submit"
                                onClick={handleSubmit}
                                style={{ backgroundColor: "rgb(60,86,91)", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Cancel"
                                size="medium"
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

    return (
        <>
            <ToastContainer style={{ marginTop: '40px', color: "white" }} />
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ width: '600px', marginTop: "100px" }}>
                    {addInstantVisitors}
                </Box>

            </SwipeableDrawer>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box>
                        <Typography variant="h5">Visitor Pre Request</Typography>
                        <hr style={{ width: "100%" }} />
                    </Box>
                </Grid>

                <Grid item lg={5} md={5} sm={12} xs={12}>
                    <Box boxShadow={3} padding={2} borderRadius={2}>
                        <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                            <Texxt placeholder="Search" label="Search" size="small" fullWidth />
                            <IconButton color="primary">
                                <Search />
                            </IconButton>
                        </Box>
                        <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                            <DatePickers placeholder="From Date" />
                            <DatePickers placeholder="To Date" />
                        </Box>
                        {showMoreFilters && (
                            <>
                                <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="Pending" />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Autocmp size="small" label="Purpose" />
                                    </FormControl>
                                </Box>

                            </>
                        )}
                        <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                            <ButtonComponent style={{ backgroundColor: "rgb(60,86,91)", color: "white" }} name="Submit" />
                            <ButtonComponent
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                onClick={handleMoreFiltersClick}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12}>
                    <Box boxShadow={3} padding={2} borderRadius={2}>
                        <Box display="flex" flexDirection="row" gap="20px">
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="center" alignItems="center" backgroundColor="#413839" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Pending</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#007C80" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Done</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="rgb(37,65,23)" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Rescheduled</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" gap="20px" mt="20px">
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#FF4500" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Cancelled</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box>
                            <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#AA6C39" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Missed</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box>
                            {/* <Box width="50%" boxShadow={1} padding={1} borderRadius={2} justifyContent="space-between" alignItems="center" backgroundColor="#800000" color="white">
                                <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">Rejected</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="body1">0</Typography></Box>
                            </Box> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="auto" boxShadow={3} borderRadius={2} bgcolor='rgb(60,86,91)'>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography ml="10px" variant="h10" color="white">Filtered By : </Typography>
                            <Typography mr="10px" variant="h10" color="white">Count = 0 </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" boxShadow={3} padding={2} borderRadius={2} bgcolor='white'>
                        <CustomDataTable columns={columns} filteredData={filteredData} onSearch={handleSearch}
                        />
                    </Box>
                </Grid>
                <FloatingButton options={floatingActionButtonOptions} bottomOffset="100px" onAddVisitorClick={handleAddVisitorClick} />
            </Grid>
        </>
    )
}

export default PreRequest;
