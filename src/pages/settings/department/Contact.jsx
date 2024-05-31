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
import { user_api } from '../../../Api/Api';
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



const ViewContact = () => {


    const [open, setOpen] = useState(false);
    const [visitorsData, setVisitorsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [status, setStatus] = useState("active");
    const [selectedRows, setSelectedRows] = useState([]);
    const [createUserChecked, setCreateUserChecked] = useState(false);
    const [information, setInformation] = useState(false);



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

    const handleRefresh = () => {
        console.log('Refresh clicked');
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


    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
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

    const floatingActionButtonOptions = selectedRows.length === 0 ? [
        { label: 'Visitor Entry', icon: <Add /> },
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
        const updatedData = filteredData.map((item) =>
            item === row ? { ...item, selected: !item.selected } : item
        );
        setFilteredData(updatedData);
        const selected = updatedData.filter(item => item.selected);
        setSelectedRows(selected);
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.employeeId) {
            newErrors.employeeId = 'Employee ID is required';
        }
        if (!formData.department) {
            newErrors.department = 'Department is required';
        }
        if (!formData.contactName) {
            newErrors.contactName = 'Contact Name is required';
        }
        if (!formData.communicationName) {
            newErrors.communicationName = 'Communication Name is required';
        }
        if (!formData.mobileNumber) {
            newErrors.mobileNumber = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Mobile Number should be 10 digits long';
        }
        if (!formData.emailId) {
            newErrors.emailId = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            newErrors.emailId = 'Invalid email address';
        }
        if (createUserChecked) {
            if (!formData.userType) {
                newErrors.userType = 'User Type is required';
            }
            if (!formData.loginId) {
                newErrors.loginId = 'Login ID is required';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.accessRights) {
                newErrors.accessRights = 'Access Rights is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form Data:', formData);

            // Clear form fields
            setFormData({
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

            // For demonstration, always showing success. Implement actual form validation and error handling as needed.
            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                    color: "white",
                },
            });
        } else {
            toast.error("Please correct the highlighted errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                    color: "white",
                },
            });
        }
    };


    const addInstantVisitors = (
        <>
            <ToastContainer style={{ marginTop: '60px' }} />

            <Box component="form" sx={{ mt: "70px", mb: "20px", gap: "10px" }} >
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box display="flex" justifyContent="space-between" backgroundColor="rgb(60,86,91)" style={{ marginTop: "20px" }}>
                            <Typography variant="h5" color="white" mt="5px" ml="10px">Create User</Typography>
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
                            <ReusableCheckbox
                                name="createUser"
                                value={createUserChecked}
                                onChange={handleCheckboxChange}
                                // label="Create User"
                                options={accessRights}
                            />
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
                                    onClick={handleFormSubmit}
                                    variant="contained"
                                    color="primary"
                                    text="Submit"
                                    name="Submit"
                                />
                                <ButtonComponent
                                    onClick={handleCloseDrawer}
                                    variant="contained"
                                    color="secondary"
                                    name="Cancel"
                                />
                                <ButtonComponent
                                    variant="contained"
                                    color="primary"
                                    text="Reset"
                                    name="Reset"
                                    style={{ color: "white", backgroundColor: "red" }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );

    const handleCopy = () => {
        const dataString = filteredData.map(row => Object.values(row).join('\t')).join('\n');
        navigator.clipboard.writeText(dataString);
        toast.success("Table data copied successfully!", {
            autoClose: 3000,
            position: "top-right",
            style: {
                backgroundColor: 'rgb(60,86,91)',
            },
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
        const wbout = XLSX.write(wb, { type: 'array', bookType: "xlsx" }); // Changed to 'array'
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const fileName = 'table_data.xlsx';
        saveAs(blob, fileName);
        toast.success("Table data downloaded as XLSX successfully!", {
            autoClose: 3000,
            position: "top-right",
            style: {
                backgroundColor: 'rgb(60,86,91)',
            },
        });
    };

    const handleFormClick = () => {
        setOpen(true);
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

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5">View Contact</Typography>
                <IconButton onClick={handleRefresh}>
                    <RefreshIcon />
                </IconButton>
            </Box>
            <hr style={{ width: "100%" }} />
            <Box boxShadow={3} p={3} m={2} borderRadius={2}>
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
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" height="40px" boxShadow={3} borderRadius={2} bgcolor='rgb(60,86,91)'>
                        <Box display="flex" mt="8px" justifyContent="space-between" alignItems="center" px={2}>
                            <Typography variant="subtitle1" mt="8px" color="white">
                                Filtered By: {statusOptions.find(option => option.value === status)?.label}
                            </Typography>
                            <Typography color="white">count : {filteredData.length}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box width="100%" boxShadow={3} padding={2} borderRadius={2} bgcolor='white'>
                        <CustomDataTable
                            columns={columns}
                            data={filteredData}
                            onSearch={handleSearch}
                            copyEnabled={true}
                            onCopy={handleCopy}
                            downloadEnabled={true}
                            onDownloadXLSX={handleDownloadXLSX}
                        />
                    </Box>
                </Grid>

                <FloatingButton
                    options={floatingActionButtonOptions}
                    bottomOffset="100px"
                    onAddVisitorClick={handleFormClick}
                />
            </Grid>
        </>
    );
};

export default ViewContact;
