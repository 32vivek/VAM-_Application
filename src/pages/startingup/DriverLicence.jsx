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
    });

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
                    backgroundColor: "rgb(60,86,91)",
                    color: "white",
                },
            });
        } else {
            toast.error("Please fill all the required fields.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    backgroundColor: "rgb(60,86,91)",
                    color: "white",
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
                backgroundColor: "rgb(60,86,91)",
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
                backgroundColor: "rgb(60,86,91)",
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

    const addInstantVisitors = (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                backgroundColor="rgb(60,86,91)"
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
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
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
                            label="Exp Date"
                            placeholder="Enter Exp Date"
                            selectedDate={formData.expDate}
                            onChange={(date) => handleChange(null, 'expDate', date)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box>
                        <Texxt
                            label="Brief"
                            size="small"
                            name="brief"
                            variant="standard"
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
                                <Typography>{attachedFile.name}</Typography>
                                <IconButton onClick={removeFile}>
                                    <CloseIcon style={{ color: "red" }} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography>No file attached</Typography>
                                <InputFileUpload onFileSelect={handleFileSelect} />
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item lg={6} md={6} xs={12}>
                    <Box
                        sx={{
                            display: "flex",
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
                                style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
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
            <ToastContainer style={{ marginTop: "60px" }} />
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ width: "600px", marginTop: "100px" }}>
                    {addInstantVisitors}
                </Box>
            </SwipeableDrawer>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box>
                        <Typography variant="h5">Driver Licence View</Typography>
                        <hr style={{ width: "100%" }} />
                    </Box>
                </Grid>
                <Box
                    boxShadow={3}
                    padding={2}
                    borderRadius={2}
                    marginLeft="20px"
                    width="100%"
                >
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Box>
                            <Box marginBottom={2} display="flex" style={{ gap: "10px" }}>
                                <Texxt
                                    placeholder="Search"
                                    variant="standard"
                                    label="Search"
                                    size="small"
                                    fullWidth
                                />
                                <IconButton color="primary">
                                    <Search />
                                </IconButton>
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
                                    style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                    name="Submit"
                                />
                                <ButtonComponent
                                    size="small"
                                    style={{ backgroundColor: "rgb(60,86,91)", color: "white" }}
                                    name={showMoreFilters ? "Hide Filters" : "More Filters"}
                                    onClick={handleMoreFiltersClick}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Box>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                        width="auto"
                        boxShadow={3}
                        borderRadius={2}
                        bgcolor="rgb(60,86,91)"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6" color="white" marginLeft="10px">
                                Filtered By: {selectedStatus.length > 0 ? selectedStatus.map(status => status.label).join(", ") : "None"}
                            </Typography>
                            <Typography mr="10px" variant="h10" color="white">
                                Count = 0{" "}
                            </Typography>
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
                            onDownloadXLSX={handleDownloadXLSX}
                        />
                    </Box>
                </Grid>
                <FloatingButton
                    options={floatingActionButtonOptions}
                    bottomOffset="100px"
                    onAddVisitorClick={handleAddVisitorClick}
                />
            </Grid>
        </>
    );
};

export default DriverLicence;
