import {
    Grid,
    FormControl,
    Box,
    IconButton,
    Typography,
    SwipeableDrawer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Autocmp from "../../components/AutoComplete";
import ButtonComponent from "../../components/Button";
import CustomDataTable from "../../components/ReactDataTable";
import axios from "axios";
import { getDL, user_api } from "../../Api/Api";
import FloatingButton from "../../components/FloatingButton";
import { toast, ToastContainer } from "react-toastify";
import Texxt from "../../components/Textfield";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
    Search,
    Add,
    Close as CloseIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import DatePickers from "../../components/DateRangePicker";
import InputFileUpload from "../../components/FileUpload";
import colors from "../colors";
import Cookies from 'js-cookie';

const statuss = [
    {
        label: "Active",
        value: "active",
    },
    { label: "In Active", value: "inActive" },
    {
        label: "Black List",
        value: "blacklist",
    },
];

const DriverLicence = () => {
    const [open, setOpen] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [visitorsData, setVisitorsData] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [attachedFile, setAttachedFile] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState([statuss[0]]);
    const [formData, setFormData] = useState({
        driverName: "",
        driverMobile: "",
        licence: "",
        brief: "",
        expDate: null,
        fromDate: null,
        toDate: null
    });
    const [searchNumber, setSearchNumber] = useState('');


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

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(user_api);
    //         setVisitorsData(response.data);
    //         setFilteredData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.driverName) {
            newErrors.driverName = "Driver Name is required";
        }
        if (!formData.driverMobile) {
            newErrors.driverMobile = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.driverMobile)) {
            newErrors.driverMobile = 'Mobile Number should be 10 digits long';
        }
        if (!formData.licence) {
            newErrors.licence = "Driver Licence is required";
        }
        if (!formData.brief) {
            newErrors.brief = "Brief is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const handleSearch = (searchText) => {
        const filtered = visitorsData.filter((item) =>
            Object.values(item).some((value) =>
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
        setSelectedRows(updatedData.filter((item) => item.selected));
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
                [name]: value,
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            console.log("Form Data:", formData, "Attached File:", attachedFile);

            // Reset the form after successful submission
            setFormData({
                driverName: "",
                driverMobile: "",
                licence: "",
                brief: "",
                expDate: null,
            });
            setAttachedFile(null);

            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
        } else {
            toast.error("Please fill all the required fields.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
        }
    };

    const handleCopy = () => {
        const dataString = filteredData
            .map((row) => Object.values(row).join("\t"))
            .join("\n");
        navigator.clipboard.writeText(dataString);
        toast.success("Table data copied successfully!", {
            autoClose: 3000,
            position: "top-right",
            style: {
                // backgroundColor: "rgb(60,86,91)",
                color: "#0075a8"
            },
        });
    };

    const handleDownloadXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");
        const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const fileName = "table_data.xlsx";
        saveAs(blob, fileName);
        toast.success("Table data downloaded as XLSX successfully!", {
            autoClose: 3000,
            position: "top-right",
            sstyle: {
                // backgroundColor: "rgb(60,86,91)",
                color: "#0075a8"
            },
        });
    };

    const handleFileSelect = (file) => {
        setAttachedFile(file);
    };

    const removeFile = () => {
        setAttachedFile(null);
    };

    const handleStatusChange = (event, name, newValue) => {
        setSelectedStatus(newValue);

        // Optionally, handle the change in formData if needed
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    const handleReset = () => {
        setFormData({
            driverName: "",
            driverMobile: "",
            licence: "",
            brief: "",
            expDate: null,
        });
        setAttachedFile(null);
    }
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({ ...prevValues, [name]: value }));
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

    const fetchData = async () => {
        try {
            const accessToken = Cookies.get('token');

            if (!accessToken) {
                throw new Error('Access token is missing');
            }


            const unitResponse = await axios.get(getDL, {

                headers: {
                    Authorization: `Bearer ${accessToken}`
                }

            });
            console.log('DL Data:', unitResponse.data);
        } catch (error) {
            if (error.response) {

                console.error('Server Error:', error.response.data);
            } else if (error.request) {

                console.error('Network Error:', error.message);
            } else {

                console.error('Error:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addInstantVisitors = (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                backgroundColor={colors.navbar}
            >
                <Typography
                    color="white"
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                    Add Driver Licence
                </Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Driver Name"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="driverName"
                            // variant="contained"
                            value={formData.driverName}
                            onChange={handleChange}
                            error={errors.driverName}
                            helperText={errors.driverName}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Driver Mobile"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="driverMobile"
                            // variant="standard"
                            value={formData.driverMobile}
                            onChange={handleChange}
                            error={errors.driverMobile}
                            helperText={errors.driverMobile}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Licence"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="licence"
                            // variant="standard"
                            onChange={handleChange}
                            value={formData.licence}
                            error={errors.licence}
                            helperText={errors.licence}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box style={{ marginTop: "15px" }}>
                        <DatePickers
                            placeholder="From Date"
                            value={formData.fromDate}
                            handleInputChange={handleInputChange}
                        />

                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Brief"
                            size="small"
                            name="brief"
                            // variant="standard"
                            required
                            placeholder="Enter Data"
                            onChange={handleChange}
                            value={formData.brief}
                            error={errors.brief}
                            helperText={errors.brief}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{ gap: "10px", marginTop: "20px" }}>
                        {attachedFile ? (
                            <>
                                <Typography >{attachedFile.name}</Typography>
                                <IconButton onClick={removeFile}>
                                    <CloseIcon style={{ color: "red" }} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography>No file attached</Typography>
                                <InputFileUpload onFileSelect={handleFileSelect}

                                />
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            ml: "25px",
                            flexDirection: "row",
                            gap: "20px",
                        }}
                    >
                        <Box>
                            <ButtonComponent
                                name="Submit"
                                size="small"
                                type="submit"
                                onClick={handleFormSubmit}
                                variant="contained"
                                backgroundColor={colors.navbar}
                            />
                        </Box>
                        <Box>
                            <ButtonComponent
                                name="Reset"
                                size="small"
                                type="submit"
                                color="success"
                                variant="contained"
                                onClick={handleReset}
                                style={styles.resetButton}
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
            <ToastContainer style={{ marginTop: "45px" }} />
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ width: "600px", marginTop: "63px" }}>
                    {addInstantVisitors}
                </Box>
            </SwipeableDrawer>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box backgroundColor={colors.navbar}>
                        <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>Driver Licence View</Typography>
                        {/* <hr style={{ marginTop: "-0px", height: "4px", borderWidth: "0", color: "rgb(60,86,91)", backgroundColor: "rgb(60,86,91)" }} /> */}
                    </Box>
                </Grid>
                <Box
                    boxShadow={3}
                    padding={2}
                    borderRadius={2}
                    marginLeft="20px"
                    width="100%"
                    marginTop="9px"
                >
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Box>
                            <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                                <Texxt
                                    placeholder="Search Data"
                                    // variant="standard"
                                    label="Search for Driver Licence"
                                    size="small"
                                    fullWidth
                                    value={searchNumber}
                                    onChange={handleSearchNumberChange}
                                />
                                {/* <IconButton color="primary">
                                    <Search />
                                </IconButton> */}
                            </Box>
                            {showMoreFilters && (
                                <>
                                    <Box
                                        display="flex"
                                        style={{ gap: "10px", marginTop: "15px" }}
                                    >
                                        <FormControl fullWidth>
                                            <Autocmp
                                                options={statuss}
                                                name="status"
                                                label="Search By Status"
                                                size="small"
                                                value={selectedStatus}
                                                multiple
                                                onChange={handleStatusChange}
                                            />
                                        </FormControl>
                                    </Box>
                                </>
                            )}
                            <Box
                                style={{
                                    gap: "10px",
                                    marginTop: "15px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ButtonComponent
                                    size="small"
                                    variant="contained"
                                    backgroundColor={colors.navbar}
                                    style={{ marginLeft: "10px", fontSize: "10px" }}
                                    name="Submit"
                                />
                                <ButtonComponent
                                    size="small"
                                    variant="contained"
                                    backgroundColor={colors.navbar}
                                    style={{ marginLeft: "10px", fontSize: "10px" }}
                                    name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                    onClick={handleMoreFiltersClick}
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
                    <Box
                        width="100%"
                        boxShadow={3}
                        padding={2}
                        borderRadius={2}
                        bgcolor="white"
                    >
                        <CustomDataTable
                            columns={columns}
                            data={filteredData}
                            onSearch={handleSearch}
                            copyEnabled={true} onSelectedRowsChange={(selected) => setSelectedRows(selected.selectedRows)}
                            // columns={columns}
                            onCopy={handleCopy}
                            downloadEnabled={true}
                            onDownloadXLSX={handleDownloadXLSX}
                        />
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

export default DriverLicence;
