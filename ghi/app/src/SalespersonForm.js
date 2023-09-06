import React, { useState } from "react";

function SalespersonForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;
        console.log(data);

        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        };
    };

    return (
        <div className="my-5 container">
            <div className="row" >
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="first_name" className="form-control" />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="last_name" className="form-control" />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmployeeIdChange} value={employeeId} placeholder="Employee Id" required type="text" name="employeeId" id="employee_id" className="form-control" />
                                <label htmlFor="employeeId">Employee Id</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalespersonForm;