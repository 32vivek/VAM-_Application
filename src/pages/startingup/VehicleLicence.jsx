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
import { user_api } from "../../Api/Api";
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

const VehicleLicence = () => {
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
        vehicleNumber: "",
        vehicleType: "",
        vehicleOwner: "",
        brief: "",
        expDate: null,
        pucDate: null,
        regDate: null,
        insuranceDate: null,
        fromDate: null,
        toDate: null,
        attachedFiles: {
            puc: null,
            insurance: null,
            registration: null
        }
    });

    const [searchNumber, setSearchNumber] = useState('');


    const floatingActionButtonOptions =
        selectedRows.length === 0
            ? [{ label: "Add", icon: <Add /> }]
            : selectedRows.length === 1
                ? [
                    { label: "Edit", icon: <EditIcon /> },
                    { label: "Delete", icon: <DeleteIcon /> },
                ]
                : [{ label: "Delete", icon: <DeleteIcon /> }];

    const columns = [
        {
            name: "Select",
            selector: "select",
            cell: (row) => (
                <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleRowSelected(row)}
                />
            ),
            sortable: false,
        },
        { name: "name", selector: (row) => row.name, sortable: true },
        { name: "email", selector: (row) => row.email, sortable: true },
        { name: "number", selector: (row) => row.number, sortable: true },
        { name: "address", selector: (row) => row.address, sortable: true },
        { name: "department", selector: (row) => row.department, sortable: true },
        { name: "number", selector: (row) => row.number, sortable: true },
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
            // padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    const handleMoreFiltersClick = () => {
        setShowMoreFilters(!showMoreFilters);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(user_api);
            setVisitorsData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.vehicleNumber) {
            newErrors.vehicleNumber = "Vehicle Number is required";
        }
        if (!formData.vehicleOwner) {
            newErrors.vehicleOwner = "Vehicle Owner Name is required";
        }
        if (!formData.vehicleType) {
            newErrors.vehicleType = "Vehicle Type is required";
        }
        if (!formData.pucDate) {
            newErrors.pucDate = "PUC Date is required";
        }
        if (!formData.regDate) {
            newErrors.regDate = "Registration Date is required";
        }
        if (!formData.insuranceDate) {
            newErrors.insuranceDate = "Insurance Date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        fetchData();
    }, []);

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

            console.log("Form Data:", formData);

            // Reset the form after successful submission
            setFormData({
                vehicleNumber: "",
                vehicleOwner: "",
                brief: "",
                vehicleType: "",
                expDate: null,
                pucDate: null,
                regDate: null,
                insuranceDate: null,
                attachedFiles: {
                    puc: null,
                    insurance: null,
                    registration: null
                }
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
            style: {
                // backgroundColor: "rgb(60,86,91)",
                color: "#0075a8"
            },
        });
    };

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                attachedFiles: {
                    ...prevFormData.attachedFiles,
                    [type]: file,
                },
            }));
        }
    };

    const removeFile = (type) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            attachedFiles: {
                ...prevFormData.attachedFiles,
                [type]: null,
            },
        }));
    };

    const handleReset = () => {
        setFormData({
            vehicleNumber: "",
            vehicleOwner: "",
            brief: "",
            vehicleType: "",
            expDate: null,
            pucDate: null,
            regDate: null,
            insuranceDate: null,
            attachedFiles: {
                puc: null,
                insurance: null,
                registration: null
            }
        });
        setAttachedFile(null);
    }





    const handleStatusChange = (event, name, newValue) => {
        setSelectedStatus(newValue);

        // Optionally, handle the change in formData if needed
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevValues) => ({ ...prevValues, [name]: value }));
    };

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
                    Add Vehicle Licence
                </Typography>
                <IconButton onClick={handleCloseDrawer}>
                    <CloseIcon style={{ color: "white", marginRight: "10px" }} />
                </IconButton>
            </Box>

            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Vehicle Number"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="vehicleNumber"
                            // variant="standard"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            error={errors.vehicleNumber}
                            helperText={errors.vehicleNumber}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Vehicle Type"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="vehicleType"
                            // variant="standard"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            error={errors.vehicleType}
                            helperText={errors.vehicleType}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Vehicle Owner"
                            placeholder="Enter Data"
                            size="small"
                            required
                            name="vehicleOwner"
                            // variant="standard"
                            onChange={handleChange}
                            value={formData.vehicleOwner}
                            error={errors.vehicleOwner}
                            helperText={errors.vehicleOwner}
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
                        {errors.pucDate && (
                            <Typography color="error">{errors.pucDate}</Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box style={{ marginTop: "15px" }}>
                        <DatePickers
                            placeholder="From Date"
                            value={formData.fromDate}
                            handleInputChange={handleInputChange}
                        />

                        {errors.regDate && (
                            <Typography color="error">{errors.regDate}</Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box style={{ marginTop: "15px" }}>
                        <DatePickers
                            placeholder="From Date"
                            value={formData.fromDate}
                            handleInputChange={handleInputChange}
                        />
                        {errors.insuranceDate && (
                            <Typography color="error">{errors.insuranceDate}</Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Brief"
                            placeholder="Enter Data"
                            size="small"
                            // required
                            name="brief"
                            // variant="standard"
                            onChange={handleChange}
                            value={formData.brief}

                        />
                    </Box>

                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{ gap: "10px", marginTop: "20px" }}>
                        {formData.attachedFiles.puc ? (
                            <>
                                <Typography>{formData.attachedFiles.puc.name}</Typography>
                                <IconButton onClick={() => removeFile('puc')}>
                                    <CloseIcon style={{ color: "red" }} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography>No file attached</Typography>
                                <InputFileUpload
                                    name="PUC"
                                    onFileSelect={(event) => handleFileUpload(event, 'puc')}
                                    backgroundColor={colors.navbar}
                                // style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                />
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{ gap: "10px", marginTop: "20px" }}>
                        {formData.attachedFiles.insurance ? (
                            <>
                                <Typography>{formData.attachedFiles.insurance.name}</Typography>
                                <IconButton onClick={() => removeFile('insurance')}>
                                    <CloseIcon style={{ color: "red" }} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography>No file attached</Typography>
                                <InputFileUpload
                                    name="Insurance"
                                    backgroundColor={colors.navbar}
                                    // style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                    onFileSelect={(event) => handleFileUpload(event, 'insurance')}
                                />
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" style={{ gap: "10px", marginTop: "20px" }}>
                        {formData.attachedFiles.registration ? (
                            <>
                                <Typography>{formData.attachedFiles.registration.name}</Typography>
                                <IconButton onClick={() => removeFile('registration')}>
                                    <CloseIcon style={{ color: "red" }} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography>No file</Typography>
                                <InputFileUpload
                                    name="Registration"
                                    backgroundColor={colors.navbar}
                                    // style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                    onFileSelect={(event) => handleFileUpload(event, 'registration')}
                                />
                            </>
                        )}
                    </Box>
                </Grid>

            </Grid>

            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                    <Box style={{ marginBottom: "20px" }}>
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
                                // style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
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
                        <Typography style={{ marginTop: "-15px", color: "white", marginLeft: "10px" }}>Vehicle Licence View</Typography>
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
                                    label="Search for Data"
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
                                    style={{ marginLeft: "10px", fontSize: "10px" }}
                                    name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                    onClick={handleMoreFiltersClick}
                                    backgroundColor={colors.navbar}
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
                            copyEnabled={true}
                            onCopy={handleCopy}
                            downloadEnabled={true}
                            onSelectedRowsChange={(selected) => setSelectedRows(selected.selectedRows)}

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

export default VehicleLicence;
