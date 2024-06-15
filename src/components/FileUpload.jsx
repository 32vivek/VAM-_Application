import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ onFileSelect, name, style }) {
    return (
        <Button
            component="label"
            variant="contained"
            size="small"
            style={style}
            startIcon={<CloudUploadIcon />}
        >
            {name}
            <VisuallyHiddenInput type="file" onChange={(e) => onFileSelect(e.target.files[0])} />
        </Button>
    );
}







// const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//         try {
//             let formDataToSend = new FormData();
//             const licenceReqDto = {
//                 driverName: formData.driverName,
//                 driverMobile: formData.driverMobile,
//                 licence: formData.licence,
//                 brief: formData.brief,

//                 expDate: formData.expDate.target.value.substring(0, 10),
//                 unitId: formData.unitId
//             };
//             console.log('licenceReqDto', licenceReqDto)
//             formDataToSend = { ...formDataToSend, 'licenceReqDto': licenceReqDto }

//             console.log(formDataToSend, "form");

//             if (attachedFile) {
//                 formDataToSend = { ...formDataToSend, 'file': attachedFile }
//             }

//             console.log(formDataToSend, "file");
//             const response = await axiosInstance.post(addDLData, formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 201 || response.status === 200) {
//                 setFormData(initialFormData);
//                 setAttachedFile(null);
//                 fetchData();

//                 toast.success("Form submitted successfully!", {
//                     autoClose: 3000,
//                     position: "top-right",
//                     style: { color: "#0075a8" },
//                 });
//             } else {
//                 throw new Error("Failed to submit form");
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error.message);
//             toast.error("Failed to submit form. Please try again.", {
//                 autoClose: 3000,
//                 position: "top-right",
//                 style: { color: "#0075a8" },
//             });
//         }
//     } else {
//         toast.error("Please fill all the required fields.", {
//             autoClose: 3000,
//             position: "top-right",
//             style: { color: "#0075a8" },
//         });
//     }
// };