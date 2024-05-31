import {
    Grid, FormControl, Box, IconButton, Typography, SwipeableDrawer
} from '@mui/material';
import React, { useState, useEffect } from 'react'
import Autocmp from '../../components/AutoComplete';
import ButtonComponent from '../../components/Button';
import CustomDataTable from '../../components/ReactDataTable';
import axios from 'axios';
import { user_api } from '../../Api/Api';
import FloatingButton from '../../components/FloatingButton';
import ReusableRadioButton from '../../components/RadioButton';
import { toast, ToastContainer, POSITION } from 'react-toastify';
import Texxt from '../../components/Textfield';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Search, Add, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

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

const Purpose = () => {
    const [open, setOpen] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [visitorsData, setVisitorsData] = useState([]);
    const [isExtendedPassRequestChecked, setIsExtendedPassRequestChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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

    const [time, setTime] = useState(null);

    const handleTimeChange = (newTime) => {
        setTime(newTime);
    };

    const floatingActionButtonOptions = selectedRows.length === 0 ? [
        { label: 'Add', icon: <Add /> },
    ] : selectedRows.length === 1 ? [
        { label: 'Edit', icon: <EditIcon /> },
        { label: 'Delete', icon: <DeleteIcon /> },
    ] : [
        { label: 'Delete', icon: <DeleteIcon /> },
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
            item === row ? { ...item, selected: !item.selected } : item
        );
        setFilteredData(updatedData);
        setSelectedRows(updatedData.filter(item => item.selected));
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
                    color: "white",
                },
            });
        } else {
            console.log("Validation Failed");
            toast.error("Validation Error! Please check the form for errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                    color: "white",
                },
            });
        }
    };

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

    const addInstantVisitors = (
        <>
            <Box display="flex" justifyContent="space-between" backgroundColor="rgb(60,86,91)" >
                <Typography color="white" style={{ marginLeft: "10px", marginTop: "10px" }}>Add Purpose</Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            label="Purpose For"
                            required
                            size="small"
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            label="Purpose"
                            required
                            placeholder="Enter Data"
                            size="small"
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <ReusableRadioButton
                            label="Alert Option"
                            options={[
                                { label: "Yes", value: "yes" },
                                { label: "No", value: "no" }
                            ]}
                            defaultValue="no"
                            onChange={(value) => {
                                handleChange('approvalRequired', value);
                                setShowAdditionalFields(value === "yes");
                            }}
                        />
                    </Box>
                </Grid>
                {showAdditionalFields && (
                    <>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <Texxt
                                    label="Alert After"
                                    size="small"
                                    required
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <Autocmp
                                    label="Alert To"
                                    required
                                    size="small"
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <Autocmp
                                    label="Employee Name"
                                    required
                                    size="small"
                                />
                            </Box>
                        </Grid>
                    </>
                )}
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
                                variant="contained"
                            // style={{ backgroundColor: "rgb(60,86,91)", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Reset"
                                size="medium"
                                type="submit"
                                color="success"
                                variant="contained"
                            // style={{ backgroundColor: "rgb(60,86,91)", color: "red" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Cancel"
                                size="medium"
                                onClick={handleCloseDrawer}
                                style={{ backgroundColor: "red", color: "white" }}
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
            <ToastContainer style={{ marginTop: '60px', color: "white" }} />
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
                        <Typography variant="h5">Purpose View</Typography>
                        <hr style={{ width: "100%" }} />
                    </Box>
                </Grid>
                <Box boxShadow={3} padding={2} borderRadius={2} marginLeft="20px" width="100%">
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box >
                            <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                                <Texxt placeholder="Search" label="Search" size="small" fullWidth />
                                <IconButton color="primary">
                                    <Search />
                                </IconButton>
                            </Box>
                            {showMoreFilters && (
                                <>
                                    <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Active" />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Purpose" />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Purpose For" />
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
                </Box>
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
                <FloatingButton options={floatingActionButtonOptions} bottomOffset="100px" onAddVisitorClick={handleAddVisitorClick} />
            </Grid>
        </>
    )
}

export default Purpose;
