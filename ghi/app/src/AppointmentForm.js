import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);

    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleSubmit = async (event)  => {
        event.preventDefault();
        const data = {};

        data.vin = vin;
        data.customer = customer;
        data.date_time = dateTime;
        data.technician_id = parseInt(technician);
        data.reason = reason;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();

            setVin('');
            setCustomer('');
            setDateTime('');
            setTechnician('');
            setReason('');
        }
    }

    const getData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="Vin">Automobile Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={customer} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="Customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={dateTime} onChange={handleDateTimeChange} placeholder="DateTime" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                            <label htmlFor="date_time">Choose a date</label>
                        </div>
                        <div className="mb-3">
                            <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
                                <option value ="">Choose a technician</option>
                                {technicians.map((technician) => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.first_name}
                                        </option>
                                    );
                                })}
                            </select>
                            </div>
                        <div className='mb-3'>
                            <label htmlFor="reason" className="form-label">Reason</label>
                            <textarea value={reason} onChange={handleReasonChange} className="form-control" id="reason" rows="3"></textarea>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppointmentForm;
