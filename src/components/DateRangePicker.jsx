import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Form, InputGroup } from 'react-bootstrap';
import './components.css';

const DatePickers = ({ label, required, selectedDate, placeholder, onChange, ...props }) => {
    return (
        <Form.Group>
            <InputGroup className="date-picker-standard">
                <DatePicker
                    selected={selectedDate}
                    onChange={onChange}
                    required={required}
                    placeholderText={placeholder}
                    customInput={<Form.Control required={required} />}
                    {...props}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default DatePickers;
