import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Form, InputGroup } from 'react-bootstrap';
// import './BootstrapDatePicker.css'; // Custom CSS file for styling
import './components.css';

const DatePickers = ({ label, selectedDate, placeholder, onChange, ...props }) => {
    return (
        <Form.Group>
            {/* {label && <Form.Label>{label}</Form.Label>} */}
            <InputGroup className="date-picker-standard">
                <DatePicker
                    selected={selectedDate}
                    onChange={onChange}
                    placeholderText={placeholder}
                    customInput={<Form.Control />}
                    {...props}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default DatePickers;
