import {
    Grid, FormControl, Box, IconButton, Typography, SwipeableDrawer
} from '@mui/material';
import React, { useState, useEffect } from 'react'
import Autocmp from '../../components/AutoComplete';
import ButtonComponent from '../../components/Button';
import CustomDataTable from '../../components/ReactDataTable';
import axios from 'axios';
import { unitIdDD, getAllPurpose, deletePurpose, downloadPurpose } from '../../Api/Api';
import FloatingButton from '../../components/FloatingButton';
import ReusableRadioButton from '../../components/RadioButton';
import { toast, ToastContainer, POSITION } from 'react-toastify';
import Texxt from '../../components/Textfield';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Search, Add, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import colors from './../colors';
import axiosInstance from '../../components/Auth';
import CustomTimePicker from '../../components/TimePicker';
import TimePicker from '../../components/TimePicker';
import Swal from 'sweetalert2';


const data = [
    { label: 'Visitor', value: 'visitor' },
    { label: 'Vehicle', value: 'vehicle' },
    // { label: 'Marketing', value: 'marketing' },
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
    const [searchNumber, setSearchNumber] = useState('');
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

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [unitIds, setUnitIds] = useState([]);

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

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
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
        {
            name: 'Purpose', selector: row => row.
                purposeBrief, sortable: true
        },
        { name: 'Purpose For', selector: row => row.purposeFor, sortable: true },
        { name: 'Alert After', selector: row => row.alertAfter, sortable: true },
        { name: 'Alert To', selector: row => row.alertTo, sortable: true },
        {
            name: 'Employee Name', selector: row => row.createdBy, sortable: true
        },
        { name: 'updated By', selector: row => row.updatedBy, sortable: true },
        {
            name: 'Created On', selector: row => row.createdAt, sortable: true
        },
        {
            name: 'Status',
            cell: (row) => row.status ? 'Active' : 'Inactive',
            sortable: true,
        },


    ];

    const handleMoreFiltersClick = () => {
        setShowMoreFilters(!showMoreFilters);
    };


    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`${getAllPurpose}`, {
                // params: {
                //     page: page - 1,
                //     size: rowsPerPage
                // }
            });

            // const activePlants = response.data.content.filter(plant => plant.status === true);
            console.log(response.data);

            setFilteredData(response.data.content);
            setVisitorsData(response.data.content);
            // setTotalRows(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };



    const fetchUnitIds = async () => {
        try {
            const response = await axiosInstance.get(`${unitIdDD}`);
            const unitIdOptions = response.data.map(unit => ({ label: unit.id, value: unit.id }));
            setUnitIds(unitIdOptions);
            console.log('Unit IDs:', unitIdOptions); // Log unitIds after fetching

        } catch (error) {
            console.error('Error fetching unit IDs:', error.message);
        }
    };
    useEffect(() => {
        fetchData(currentPage, rowsPerPage);
        fetchUnitIds();
    }, [currentPage, rowsPerPage]);

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
                    // backgroundColor: 'rgb(60,86,91)',
                    color: "#0075a8"
                },
            });
        } else {
            console.log("Validation Failed");
            toast.error("Validation Error! Please check the form for errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: 'rgb(60,86,91)',
                    color: "#0075a8"
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
                // backgroundColor: 'rgb(60,86,91)',
                color: "#0075a8"
            },
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchData(page, rowsPerPage);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(1);
        fetchData(1, newPerPage);
    };

    const handleDownloadXLSX = async () => {
        try {
            const response = await axiosInstance.get(downloadPurpose, {
                responseType: 'arraybuffer',
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'purpose.xlsx');

            toast.success("Purpose data downloaded successfully!", {
                autoClose: 3000,
                position: "top-right",
            });
        } catch (error) {
            console.error('Error downloading purpose data:', error.message);
            toast.error("Error downloading purpose data. Please try again later.", {
                autoClose: 3000,
                position: "top-right",
            });
        }
    };

    const handleDelete = async () => {
        // if (selectedRows.length === 0) {
        //     return;
        // }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete the selected plants?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const deleteRequests = selectedRows.map(row => axiosInstance.delete(`${deletePurpose}/${row.id}`));
                    await Promise.all(deleteRequests);
                    toast.success("Plants deleted successfully!", {
                        autoClose: 3000,
                        position: "top-right",
                        style: {
                            backgroundColor: 'color: "#0075a8"',
                        },
                    });

                    fetchData();
                } catch (error) {
                    toast.error(`Error deleting plants: ${error.message}`, {
                        autoClose: 3000,
                        position: "top-right",
                    });
                    console.error('Error deleting plants:', error.message);
                }
            }
        });
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

    const handleAutocompleteChange = (event, newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            unitId: newValue ? newValue.value : null,
        }));
    };

    const addInstantVisitors = (
        <>
            <Box display="flex" justifyContent="space-between" backgroundColor={colors.navbar} >
                <Typography color="white" style={{ marginLeft: "10px", marginTop: "10px" }}>Add Purpose</Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Autocmp
                            options={data}
                            name="purposeFor"
                            label="Purpose For"
                            required
                            size="small"
                        // options={data}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box>
                        <Texxt
                            name="purposeBrief"
                            label="Purpose"
                            required
                            size="small"

                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
                    <Box display="flex" style={{ gap: "15px" }}>
                        <Typography marginTop="10px"> Alert Option</Typography>
                        <ReusableRadioButton
                            // label="Alert Option"
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Autocmp
                            label="Unit ID"
                            name="unitId"
                            value={unitIds.find(option => option.value === formData.unitId) || null}
                            onChange={handleAutocompleteChange}
                            options={unitIds}
                            getOptionLabel={(option) => option.value} // Display label in dropdown
                            getOptionSelected={(option, value) => option.value === value.value} // Compare by value
                            size="small"
                        // error={errors.unitId}
                        />
                        {errors.unitId && (
                            <Typography variant="caption" color="error">{errors.unitId}</Typography>
                        )}

                    </Box>
                </Grid>
                {showAdditionalFields && (
                    <>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <TimePicker
                                    label="Alert After"
                                    value={selectedTime}
                                    required
                                    onChange={handleTimeChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <Autocmp
                                    // options={department}
                                    size="small"
                                    name="Department"
                                    label="Department"
                                    required
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sm={12}>
                            <Box>
                                <Autocmp
                                    label="Employee Name"
                                    required
                                    size="small"
                                // data={employee}
                                />
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
            <Grid container>
                <Grid item lg={12} md={12} xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", ml: "25px", flexDirection: "row", gap: "20px" }}>
                        <Box>
                            <ButtonComponent
                                name="Submit"
                                size="medium"
                                type="submit"
                                onClick={handleSubmit}
                                variant="contained"
                                backgroundColor={colors.navbar}
                                style={{ fontSize: "12px", borderRadius: "10px" }}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Reset"
                                size="small"
                                type="submit"
                                variant="contained"
                                fontSize="12px"
                                style={styles.resetButton}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Cancel"
                                size="medium"
                                onClick={handleCloseDrawer}
                                style={{ backgroundColor: "red", fontSize: "12px", color: "white", borderRadius: "10px" }}
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



    const handleSearchNumberChange = (event) => {
        const searchText = event.target.value;
        setSearchNumber(searchText);
        const filtered = visitorsData.filter(item =>
            item.number && item.number.toString().includes(searchText)
        );
        setFilteredData(filtered);
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
            {/* <Box >
                <Typography variant="h6" style={{ marginTop: "-15px" }}>Purpose View</Typography>
             </Box> */}

            <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box backgroundColor={colors.navbar}>
                        <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>Purpose View</Typography>
                        {/* <hr style={{ marginTop: "-0px", height: "4px", borderWidth: "0", color: "rgb(60,86,91)", backgroundColor: "rgb(60,86,91)" }} /> */}
                    </Box>
                </Grid>
                <Box boxShadow={3} padding={2} borderRadius={2} marginLeft="20px" marginTop="9px" width="100%">
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <Box >
                            <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                                <Texxt
                                    label="Search By Number"
                                    size="small"
                                    placeholder="Enter Number"
                                    value={searchNumber}
                                    onChange={handleSearchNumberChange}
                                />
                            </Box>
                            {showMoreFilters && (
                                <>
                                    <Box display="flex" style={{ gap: "10px", marginTop: "15px" }}>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Active" options={data}
                                                onChange={(event, value) => handleAutocompleteChange(value)}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Purpose" options={data}
                                                onChange={(event, value) => handleAutocompleteChange(value)}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Autocmp size="small" label="Purpose For" options={data}
                                                onChange={(event, value) => handleAutocompleteChange(value)}
                                            />
                                        </FormControl>
                                    </Box>
                                </>
                            )}
                            <Box style={{ gap: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                                <ButtonComponent
                                    variant="contained" style={{ fontSize: "10px" }} backgroundColor={colors.navbar}
                                    name="Submit" size="small" />
                                <ButtonComponent
                                    size="small"
                                    variant="contained"
                                    style={{ marginLeft: "10px", fontSize: "10px" }}
                                    backgroundColor={colors.navbar}
                                    name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                    onClick={handleMoreFiltersClick}
                                // style={{ marginLeft: "10px", fontSize: "10px" }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Box>
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
                        <CustomDataTable
                            onSearch={handleSearch}
                            data={filteredData}
                            columns={columns}
                            onSelectedRowsChange={(selected) => setSelectedRows(selected.selectedRows)}
                            selectableRows
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            copyEnabled={true}
                            onCopy={handleCopy}
                            downloadEnabled={true}
                            onDownloadXLSX={handleDownloadXLSX}
                            selectableRowsHighlight
                        />
                    </Box>
                </Grid>
                {/* <FloatingButton options={floatingActionButtonOptions}
                    bottomOffset="100px"
                    onButtonClick={handleFloatingButtonClick} /> */}
            </Grid>

            <FloatingButton options={floatingActionButtonOptions}
                bottomOffset="100px"
                onButtonClick={handleFloatingButtonClick} />
        </>
    )
}

export default Purpose;