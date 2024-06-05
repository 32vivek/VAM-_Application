import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import Texxt from '../../components/Textfield';
import CustomCheckbox from '../../components/CheckBox';
import ReusableRadioButton from '../../components/RadioButton';
import Autocmp from '../../components/AutoComplete';
import ButtonComponent from '../../components/Button';
import { toast, ToastContainer, POSITION } from 'react-toastify';
import colors from '../colors';



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

const employeeNameOptions = [
    { label: 'John Doe', value: 'john_doe' },
    { label: 'Jane Smith', value: 'jane_smith' },
    { label: 'Alice Johnson', value: 'alice_johnson' },
];


const AddPreVisitors = () => {


    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        number: '',
        name: '',
        visitorcompany: '',
        department: null,
        purpose: null,
        employeeName: null,
        visitorAddress: '',
        possessionAllowed: '',
        visitorCardNo: '',
        vehicleNumber: '',
        laptop: '',
        mail: true,
        sms: true
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (values) => {
        const errors = {};

        const numberRegex = /^\d{10}$/;

        if (!values.number) {
            errors.number = "Number is required";
        } else if (!numberRegex.test(values.number)) {
            errors.number = "Number must be 10 digits";
        }

        if (!values.name) {
            errors.name = "Visitor Name is required";
        } else if (values.name.length < 2 || values.name.length > 19) {
            errors.name = "Visitor Name must be between 2 and 19 characters";
        }

        if (!values.visitorcompany) {
            errors.visitorcompany = "Visitor Company is required";
        } else if (values.visitorcompany.length < 2 || values.visitorcompany.length > 45) {
            errors.visitorcompany = "Visitor Company name must be between 2 and 45 characters";
        }

        if (!values.department) {
            errors.department = "Department is required";
        }

        if (!values.employeeName) {
            errors.employeeName = "Employee Name is required";
        }

        if (!values.purpose) {
            errors.purpose = "Purpose is required";
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(formData);
        setFormErrors(errors);
        console.log('Form data before submission:', formData);

        if (Object.keys(errors).length === 0) {
            toast.success("Form submitted successfully!", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });
            setFormData({
                number: '',
                name: '',
                visitorcompany: '',
                department: null,
                purpose: null,
                employeeName: null,
                visitorAddress: '',
                possessionAllowed: '',
                visitorCardNo: '',
                vehicleNumber: '',
                laptop: '',
                mail: true,
                sms: true
            });

        } else {
            toast.error("Validation Error! Please check the form for errors.", {
                autoClose: 3000,
                position: "top-right",
                style: {
                    // backgroundColor: "rgb(60,86,91)",
                    color: "#0075a8"
                },
            });

        }


    };

    const handleReset = () => {
        setFormData({
            number: '',
            name: '',
            visitorcompany: '',
            department: null,
            purpose: null,
            employeeName: null,
            visitorAddress: '',
            possessionAllowed: '',
            visitorCardNo: '',
            vehicleNumber: '',
            laptop: '',
            mail: true,
            sms: true
        });
        setFormErrors({});
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


    return (
        <>
            <ToastContainer style={{ marginTop: '60px', color: "white" }} />
            <Box component="form" sx={{}}>
                <Grid container spacing={1} sx={{ p: 1 }}>
                    <Grid item lg={10} md={10} sm={12} xs={12}>
                        <Box display="flex" style={{ gap: "10px" }}>
                            <Texxt
                                name="otp"
                                size="small"
                                type="number"
                                label="OTP"
                                placeholder="Enter OTP"
                            />
                            {/* <IconButton color="primary">
                                <Search />
                            </IconButton> */}

                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Texxt
                                name="number"
                                size="small"
                                type="number"
                                required
                                label="Visitor Number"
                                placeholder="Enter Visitor Number"
                                error={formErrors.number}
                                helperText={formErrors.number}
                                value={formData.number}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Texxt
                                name="name"
                                size="small"
                                type="text"
                                required
                                label="Visitor Name"
                                placeholder="Enter Visitor Name"
                                error={formErrors.name}
                                helperText={formErrors.name}
                                value={formData.name}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Texxt
                                name="visitorcompany"
                                size="small"
                                required
                                type="text"
                                label="Visitor Company"
                                placeholder="Enter Visitor Company Name"
                                error={formErrors.visitorcompany}
                                helperText={formErrors.visitorcompany}
                                value={formData.visitorcompany}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Texxt
                                name="visitorAddress"
                                size="small"
                                type="text"
                                label="Visitor Address"
                                placeholder="Enter Visitor Address"
                                value={formData.visitorAddress}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Autocmp
                                name="department"
                                label="Department"
                                size="small"
                                required
                                options={departmentOptions}
                                value={formData.department}
                                onChange={(value) => handleChange('department', value)}
                                error={formErrors.department}
                                helperText={formErrors.department}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Autocmp
                                name="employeeName"
                                label="Employee Name"
                                size="small"
                                required
                                options={employeeNameOptions}
                                value={formData.employeeName}
                                onChange={(value) => handleChange('employeeName', value)}
                                error={formErrors.employeeName}
                                helperText={formErrors.employeeName}
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
                            <Texxt
                                name="visitorCardNo"
                                size="small"
                                type="text"
                                label="Visitor Card No"
                                placeholder="Enter Visitor Card No"
                                value={formData.visitorCardNo}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <Texxt
                                name="vehicleNumber"
                                size="small"
                                type="text"
                                label="Vehicle Number"
                                placeholder="Enter Vehicle Number"
                                value={formData.vehicleNumber}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
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
                            <Autocmp
                                name="purpose"
                                label="Purpose"
                                size="small"
                                required
                                options={purposeOptions}
                                value={formData.purpose}
                                onChange={(value) => handleChange('purpose', value)}
                                error={formErrors.purpose}
                                helperText={formErrors.purpose}
                            />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12} sm={12}>
                        {/* <Box >  <Typography>Notify Employee</Typography></Box> */}
                        <Box display="flex" style={{ gap: "5px" }}>
                            <Typography marginTop="10px">Notify Employee</Typography>
                            <CustomCheckbox
                                label="Mail"
                                checked={formData.mail} onChange={(e) => handleChange('mail', e.target.checked)}
                            />
                            <CustomCheckbox
                                label="SMS"
                                checked={formData.sms} onChange={(e) => handleChange('sms', e.target.checked)}
                            />
                        </Box>
                    </Grid>
                    {/* <Grid item lg={6} md={6} xs={12} sm={12}>
                        <Box>
                            <ReusableRadioButton
                                label="Approval Required"
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]}
                                defaultValue="yes"
                                onChange={(value) => console.log("Selected option:", value)}
                            />
                        </Box>
                    </Grid> */}

                </Grid>
                <Grid container>
                    <Grid item lg={12} md={12} xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", ml: "25px", flexDirection: "row", gap: "20px" }}>
                            <Box>
                                <ButtonComponent
                                    name="Submit"
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    backgroundColor={colors.navbar}
                                    onClick={handleSubmit}
                                />
                            </Box>
                            <Box>
                                <ButtonComponent
                                    name="Reset"
                                    size="small"
                                    variant="contained"
                                    onClick={handleReset}
                                    style={styles.resetButton}
                                />
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AddPreVisitors;
