import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const TimePicker = ({ label, value, onChange }) => {
    const [selectedTime, setSelectedTime] = useState(value);

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setSelectedTime(newTime);
        onChange(newTime);
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label className="me-3">{label}</Form.Label>
            &nbsp;&nbsp;
            <Form.Control
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
            />
        </Form.Group>
    );
};

TimePicker.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TimePicker;
