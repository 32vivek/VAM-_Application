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
import { toast, ToastContainer, POSITION } from 'react-toastify';
import Texxt from '../../components/Textfield';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Search, Add, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';



const UnitSettings = () => {
    const [open, setOpen] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [visitorsData, setVisitorsData] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const [formData, setFormData] = useState({
        unitName: "",
        ip: "",
        city: "",
        passAddress: "",
        passDisclaimer: ""
    });




    const floatingActionButtonOptions = selectedRows.length === 0 ? [
        { label: 'Edit', icon: <EditIcon /> },
        { label: 'Add', icon: <Add /> },
    ] : selectedRows.length === 1 ? [
        // { label: 'Edit', icon: <EditIcon /> },
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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.unitName) {
            newErrors.unitName = 'Unit Name is required';
        }
        if (!formData.ip) {
            newErrors.ip = 'ip is required';
        }
        if (!formData.city) {
            newErrors.city = 'city is required';
        }
        if (!formData.passAddress) {
            newErrors.passAddress = 'Pass Address is required';
        }
        if (!formData.passDisclaimer) {
            newErrors.passDisclaimer = 'Pass Disclaimer is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setFormData([{
                unitName: "",
                ip: "",
                city: "",
                passAddress: "",
                passDisclaimer: ""
            }])
            console.log('Form Data:', formData);

            setFormData({
                unitName: "",
                ip: "",
                city: "",
                passAddress: "",
                passDisclaimer: "",
            })

            // For demonstration, always showing success. Implement actual form validation and error handling as needed.
            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                    color: 'white'
                },
            });

        } else {
            toast.error("Please correct the highlighted errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: 'rgb(60,86,91)',
                    color: 'white'
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
                <Typography color="white" style={{ marginLeft: "10px", marginTop: "10px" }}>Add Unit Settings</Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>


            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Unit Name"
                            required
                            name="unitName"
                            size="small"
                            value={formData.unitName}
                            onChange={handleChange}
                            placeholder="Enter Data"
                            error={errors.unitName}
                            helperText={errors.unitName}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="IP"
                            required
                            name="ip"
                            value={formData.ip}
                            onChange={handleChange}
                            size="small"
                            placeholder="Enter Data"
                            error={errors.ip}
                            helperText={errors.ip}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="City"
                            required
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            size="small"
                            placeholder="Enter Data"
                            error={errors.city}
                            helperText={errors.city}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Pass Address"
                            required
                            name="passAddress"
                            value={formData.passAddress}
                            onChange={handleChange}
                            size="small"
                            rows="2"
                            multiline={true}
                            placeholder="Enter Data"
                            error={errors.passAddress}
                            helperText={errors.passAddress}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Pass Disclaimer"
                            required
                            name="passDisclaimer"
                            value={formData.passDisclaimer}
                            onChange={handleChange}
                            size="small"
                            rows="2"
                            multiline={true}
                            placeholder="Enter Data"
                            error={errors.passDisclaimer}
                            helperText={errors.passDisclaimer}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3} >
                <Grid item lg={6} md={6} xs={12}>
                    <Box sx={{ display: "flex", ml: "25px", flexDirection: "row", gap: "20px" }}>
                        <Box>
                            <ButtonComponent
                                name="Submit"
                                size="small"
                                type="submit"
                                onClick={handleFormSubmit}
                                variant="contained"
                            // style={{ backgroundColor: "rgb(60,86,91)", fontSize: "12px", color: "white" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Reset"
                                size="small"
                                type="submit"
                                color="success"
                                variant="contained"
                            // style={{ backgroundColor: "rgb(60,86,91)", color: "red" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Cancel"
                                size="small"
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
                        <Typography variant="h5">View Unit Settings</Typography>
                        <hr style={{ width: "100%" }} />
                    </Box>
                </Grid>
                <Box boxShadow={3} padding={2} borderRadius={2} marginLeft="20px" width="100%">
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Box >
                            <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                                <Texxt placeholder="Search" variant="standard" label="Search" size="small" fullWidth />
                                <IconButton color="primary">
                                    <Search />
                                </IconButton>
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

export default UnitSettings;
