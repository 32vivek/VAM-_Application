import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, IconButton, SwipeableDrawer } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import Texxt from '../../../components/Textfield';
import Autocmp from '../../../components/AutoComplete';
import CustomDataTable from './../../../components/ReactDataTable';
import { getDepartmentsData, user_api } from '../../../Api/Api';
import axios from 'axios';
import FloatingButton from '../../../components/FloatingButton';
import { Add } from "@mui/icons-material";
import { Close as CloseIcon } from '@mui/icons-material';
import ButtonComponent from '../../../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ReusableCheckbox from '../../../components/CheckBox';
import colors from './../../colors';
import axiosInstance from '../../../components/Auth';
import MyTable from '../../../components/ReactTable';
import StickyHeadTable from '../../../components/ReactTable';

const dateOptions = [
    { label: "Date Wise", value: "dateWise" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Weekly", value: "weekly" },
    { label: "Yearly", value: "yearly" },
];

const statusOptions = [
    { label: "Active", value: "active" },
    { label: "In Active", value: "inactive" },
];

const accessRights = [
    {
        label: "Create User", value: "yes"
    },

]

const info = [
    { label: "Mail", value: "mail" }, {
        label: "SMS", value: "sms"
    }
]

const userType = [
    { label: "HR", value: "hr" },
    { label: "Admin", value: 'admin' }
]

const userTypes = [
    { label: "HR", value: "hr" },
    { label: "Admin", value: 'admin' }
]

const columns = [
    { id: 'departmentName', label: 'Department Name', minWidth: 170 },
    { id: 'departmentCode', label: 'Department Name', minWidth: 100 },
    { id: 'departmentName', label: 'Department Name', minWidth: 170 },
    { id: 'departmentCode', label: 'Department Name', minWidth: 100 }, { id: 'departmentName', label: 'Department Name', minWidth: 170 },
    { id: 'departmentCode', label: 'Department Name', minWidth: 100 }, { id: 'departmentName', label: 'Department Name', minWidth: 170 },
    { id: 'departmentCode', label: 'Department Name', minWidth: 100 },
];

const ViewContact = () => {


    const [open, setOpen] = useState(false);
    const [visitorsData, setVisitorsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [status, setStatus] = useState("active");
    const [selectedRows, setSelectedRows] = useState([]);
    const [createUserChecked, setCreateUserChecked] = useState(false);
    const [information, setInformation] = useState(false);

    const [data, setData] = useState([]); // Example state initialization


    const [formData, setFormData] = useState({
        department: null,
        contactName: '',
        communicationName: '',
        mobileNumber: '',
        emailId: '',
        userType: null,
        loginId: '',
        password: '',
        confirmPassword: '',
        accessRights: null,
    });

    const [errors, setErrors] = useState({});

    const toggleDrawer = (isOpen) => {
        setOpen(isOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };



    const handleChange = (e, name, value) => {
        if (e && e.target && e.target.name) {
            const { name, value } = e.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };







    const fetchData = async () => {
        try {
            // console.log(`Fetching data for page ${page} with size ${size}`);
            const response = await axiosInstance.get(`${getDepartmentsData}`, {

            });
            console.log('API Response:', response.data); // Log the response data
            const activePlants = response.data.content.filter(plant => plant.status === true);
            setFilteredData(activePlants);
            setVisitorsData(activePlants);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const floatingActionButtonOptions = selectedRows.length === 0 ? [
        { label: 'Add', icon: <Add /> },
    ] : selectedRows.length === 1 ? [
        { label: 'Edit', icon: <EditIcon /> },
        { label: 'Delete', icon: <DeleteIcon /> },
    ] : [
        { label: 'Delete', icon: <DeleteIcon /> },
    ];

    const handleStatusChange = (event, newValue) => {
        setStatus(newValue ? newValue.value : '');
    };

    const handleRowSelected = (row) => {
        const updatedData = data.map(item =>
            item === row ? { ...item, selected: !item.selected } : item
        );
        setData(updatedData);  // Assuming 'setData' is your state updater for 'data'
    };


    const handleSearch = (searchText) => {
        const filtered = visitorsData.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCreateUserChecked(checked);
    };
    const handleCheckboxChangeInfo = (e) => {
        const { name, checked } = e.target;
        setInformation(checked);
    };






    const handleDelete = () => {
        if (selectedRows.length > 0) {
            const remainingData = filteredData.filter(item => !selectedRows.includes(item));
            setFilteredData(remainingData);
            setSelectedRows([]);
            toast.success("Selected rows deleted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
        }
    };

    const handleFloatingButtonClick = (label) => {
        if (label === 'Add') {
            handleAddVisitorClick();
        } else if (label === 'Delete') {
            handleDelete();
        } else if (label === 'Edit') {
            // Handle edit action here
        }
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
            {/* <ToastContainer style={{ marginTop: '45px' }} /> */}

            <Box component="form" sx={{ mt: "63px", mb: "20px", gap: "10px" }} >
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box display="flex" justifyContent="space-between" backgroundColor={colors.navbar}>
                            <Typography variant="h6" color="white" mt="5px" ml="10px">Create User</Typography>
                            <IconButton onClick={handleCloseDrawer}>
                                <CloseIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box p={2} sx={{ backgroundColor: '#f2f2f2', width: "100%", height: "490px" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Texxt
                                type="text"
                                placeholder="Employee Id"
                                size="small"
                                label="Employee Id"
                                name="employeeId"
                                required
                                value={formData.employeeId}
                                onChange={handleChange}
                                error={errors.employeeId}
                                helperText={errors.employeeId}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Autocmp
                                disablePortal
                                id="department"
                                size="small" required
                                options={userTypes}
                                name="department"
                                label="Department"
                                value={formData.department}
                                onChange={(e, value) => handleChange(e, "department", value)}
                                renderInput={(params) => (
                                    <Texxt {...params}
                                        name="department"
                                        error={errors.department}
                                        helperText={errors.department}
                                        placeholder="Department"
                                        size="small" />
                                )}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Texxt
                                type="text"
                                placeholder="Contact Name"
                                size="small"
                                label="Contact Name"
                                name="contactName" required
                                value={formData.contactName}
                                onChange={handleChange}
                                error={errors.contactName}
                                helperText={errors.contactName}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Texxt
                                type="text"
                                placeholder="Communication Name"
                                size="small"
                                label="Communication Name" required
                                name="communicationName"
                                value={formData.communicationName}
                                onChange={handleChange}
                                error={errors.communicationName}
                                helperText={errors.communicationName}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Texxt
                                type="text"
                                placeholder="Mobile Number"
                                size="small"
                                name="mobileNumber"
                                label="Mobile Number" required
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                error={errors.mobileNumber}
                                helperText={errors.mobileNumber}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Texxt
                                type="text"
                                placeholder="Email Id"
                                size="small"
                                name="emailId"
                                label="Email Id"
                                value={formData.emailId}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Box display="flex" style={{ gap: "15px" }}>
                                <Typography marginTop="10px">Create User</Typography>
                                <ReusableCheckbox
                                    name="createUser"
                                    value={createUserChecked}
                                    onChange={handleCheckboxChange}
                                    // label="Create User"
                                    options={accessRights}
                                />
                            </Box>
                        </Grid>

                        {createUserChecked && (
                            <>
                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Autocmp
                                        disablePortal
                                        id="userType"
                                        size="small"
                                        options={userType}
                                        name="userType" required
                                        label="User Type"
                                        value={formData.userType}
                                        onChange={(e, value) => handleChange(e, "userType", value)}
                                        renderInput={(params) => (
                                            <Texxt {...params}
                                                name="userType"
                                                error={errors.userType}
                                                helperText={errors.userType}
                                                placeholder="User Type"
                                                size="small" />
                                        )}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Texxt
                                        type="text"
                                        placeholder="Login Id"
                                        size="small"
                                        name="loginId"
                                        label="Login Id" required
                                        value={formData.loginId}
                                        onChange={handleChange}
                                        error={errors.loginId}
                                        helperText={errors.loginId}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Texxt
                                        type="password"
                                        placeholder="Password"
                                        size="small"
                                        name="password"
                                        label="Password" required
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        helperText={errors.password}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Texxt
                                        type="password"
                                        placeholder="Confirm Password"
                                        size="small" required
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Autocmp
                                        disablePortal
                                        id="accessRights"
                                        size="small"
                                        options={accessRights}
                                        name="accessRights"
                                        label="Access Rights" required
                                        value={formData.accessRights}
                                        onChange={(e, value) => handleChange(e, "accessRights", value)}
                                        renderInput={(params) => (
                                            <Texxt {...params}
                                                name="accessRights"
                                                error={errors.accessRights}
                                                helperText={errors.accessRights}
                                                placeholder="Access Rights"
                                                size="small" />
                                        )}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <ReusableCheckbox
                                        name="sendInformation"
                                        value={information}
                                        onChange={handleCheckboxChangeInfo}
                                        label="Send Info"
                                        options={info}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box display="flex" justifyContent="center" m={2} style={{ gap: "10px" }}>
                                <ButtonComponent
                                    // onClick={handleFormSubmit}
                                    variant="contained"
                                    backgroundColor={colors.navbar}
                                    color="primary"
                                    text="Submit"
                                    name="Submit"
                                />
                                <ButtonComponent
                                    onClick={handleCloseDrawer}
                                    variant="contained"
                                    // color="red"
                                    style={{ backgroundColor: "red", color: "white" }}
                                    name="Cancel"
                                />
                                <ButtonComponent
                                    variant="contained"
                                    color="primary"
                                    text="Reset"
                                    name="Reset"
                                    style={styles.resetButton}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );





    const handleAddVisitorClick = () => {
        setOpen(true);
    };
    const handleAutocompleteChange = (value) => {
        // console.log("Selected value:", value);
        // Handle the selected value here
    };

    return (
        <>
            <ToastContainer style={{ marginTop: '45px', color: "white" }} />
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
                <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>View Contact</Typography>
                {/* <hr style={{ marginTop: "-0px", height: "4px", borderWidth: "0", color: "rgb(60,86,91)", backgroundColor: "rgb(60,86,91)" }} /> */}
            </Box>
            {/* <hr style={{ width: "100%" }} /> */}
            <Box boxShadow={3} p={3} borderRadius={2} marginTop="8px">
                <Grid container spacing={3}>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <Box>
                            <Texxt
                                label="Search"
                                placeholder="Enter Data"
                                variant="outlined"
                                size="small"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <Box>
                            <Autocmp
                                label="Department"
                                name="department"
                                size="small"
                                variant="outlined"
                                options={dateOptions}
                                onChange={(event, value) => handleAutocompleteChange(value)}
                            // onChange={(e, value) => handleChange(null, 'department', value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <Box>
                            <Autocmp
                                name="status"
                                size="small"
                                label="Status"
                                variant="outlined"
                                options={statusOptions}
                                onChange={handleStatusChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2} marginTop="5px">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box boxShadow={3} borderRadius={2} bgcolor={colors.navbar} height="35px" borderWidth="0">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography ml="10px" mt="8px" variant="h10" fontSize="10px" color="white">Filtered By : </Typography>
                            {/* <Typography mr="10px" variant="h10" color="white">Count = 0 </Typography> */}
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" boxShadow={3} padding={2} borderRadius={2} bgcolor='white'>
                        <StickyHeadTable columns={columns} rows={filteredData} />
                    </Box>
                </Grid>

                <FloatingButton
                    options={floatingActionButtonOptions}
                    bottomOffset="100px"
                    onButtonClick={handleFloatingButtonClick}
                />
            </Grid>
        </>
    );
};

export default ViewContact;
