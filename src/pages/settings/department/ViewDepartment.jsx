import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, IconButton, SwipeableDrawer } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import Texxt from '../../../components/Textfield';
import Autocmp from '../../../components/AutoComplete';
import CustomDataTable from '../../../components/ReactDataTable';
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

const ViewDepartment = () => {
    const [open, setOpen] = useState(false);
    const [visitorsData, setVisitorsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [status, setStatus] = useState("active");
    const [departments, setDepartments] = useState([{ department: '', departmentCode: '' }]);
    const [errors, setErrors] = useState([{ department: '', departmentCode: '' }]);
    const [selectedRows, setSelectedRows] = useState([]);

    const toggleDrawer = (isOpen) => {
        setOpen(isOpen);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    const handleRefresh = () => {
        console.log('Refresh clicked');
    };

    const handleStatusChange = (event, newValue) => {
        setStatus(newValue ? newValue.value : '');
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

    const handleInputChange = (index, field, value) => {
        const newDepartments = [...departments];
        newDepartments[index][field] = value;
        setDepartments(newDepartments);

        // Clear validation error for the field
        const newErrors = [...errors];
        newErrors[index][field] = '';
        setErrors(newErrors);
    };

    const handleAddDepartment = () => {
        setDepartments(prevDepartments => [...prevDepartments, { department: '', departmentCode: '' }]);
        setErrors(prevErrors => [...prevErrors, { department: '', departmentCode: '' }]);
    };

    const handleRemoveDepartment = (index) => {
        setDepartments(prevDepartments => prevDepartments.filter((_, i) => i !== index));
        setErrors(prevErrors => prevErrors.filter((_, i) => i !== index));
    };

    const validate = () => {
        let tempErrors = [];
        let isValid = true;

        departments.forEach((department, index) => {
            let error = { department: '', departmentCode: '' };
            if (!department.department) {
                error.department = "Department is required";
                isValid = false;
            }
            if (!department.departmentCode) {
                error.departmentCode = "Department Code is required";
                isValid = false;
            }
            tempErrors.push(error);
        });

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            console.log('Form data before submission:', departments);
            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                // style: {
                //     backgroundColor: 'rgb(60,86,91)',
                //     color: "white",
                // },
            });
            // Reset form data state
            setDepartments([{ department: '', departmentCode: '' }]);
            setErrors([{ department: '', departmentCode: '' }]);
            console.log('Form data state after update:', departments);
        } else {
            toast.error("Please fill in all required fields.", {
                autoClose: 3000,
                position: "top-right",
                // style: {
                //     backgroundColor: 'rgb(60,86,91)',
                //     color: "white",
                // },
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
                            <Typography variant="h5" color="white" mt="5px" ml="10px">Add Department</Typography>
                            <IconButton onClick={handleCloseDrawer}>
                                <CloseIcon style={{ color: "white" }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={1} sx={{ p: 3 }}>
                {departments.map((department, index) => (
                    <React.Fragment key={index}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Box>
                                <Texxt
                                    label="Department"
                                    name={`department-${index}`}
                                    required
                                    placeholder="Enter Data"
                                    size="small"
                                    value={department.department}
                                    onChange={(e) => handleInputChange(index, 'department', e.target.value)}
                                    error={Boolean(errors[index]?.department)}
                                    helperText={errors[index]?.department}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Box>
                                <Texxt
                                    label="Department Code"
                                    name={`departmentCode-${index}`}
                                    required
                                    placeholder="Enter Data"
                                    size="small"
                                    value={department.departmentCode}
                                    onChange={(e) => handleInputChange(index, 'departmentCode', e.target.value)}
                                    error={Boolean(errors[index]?.departmentCode)}
                                    helperText={errors[index]?.departmentCode}
                                />
                            </Box>
                        </Grid>
                        {index === departments.length - 1 && (
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                                <Box style={{ gap: "20px" }}>
                                    <IconButton onClick={handleAddDepartment}>
                                        <AddIcon style={{ color: "white", backgroundColor: "green", borderRadius: "50%", width: "40px", height: "40px" }} />
                                    </IconButton>
                                    {departments.length > 1 && (
                                        <IconButton onClick={() => handleRemoveDepartment(index)} >
                                            <RemoveIcon style={{ color: "white", backgroundColor: "red", borderRadius: "50%", width: "40px", height: "40px" }} />
                                        </IconButton>
                                    )}
                                </Box>
                            </Grid>
                        )}
                    </React.Fragment>
                ))}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{ gap: "10px" }}>
                        <ButtonComponent name="Save" variant="contained" size="small" onClick={handleSubmit} />
                        <ButtonComponent name="Cancel" variant="contained" color="secondary" size="small" onClick={handleCloseDrawer} />
                        <ButtonComponent name="Reset" variant="contained" size="small" style={{ backgroundColor: "red", color: "white" }} onClick={() => {
                            setDepartments([{ department: '', departmentCode: '' }]);
                            setErrors([{ department: '', departmentCode: '' }]);
                        }} />
                    </Box>
                </Grid>
            </Grid>
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
                <Typography variant="h5">View Department</Typography>
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

                            <Typography variant="subtitle1" mt="8px" color="white">Filtered By: {statusOptions.find(option => option.value === status)?.label}</Typography>


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

export default ViewDepartment;
