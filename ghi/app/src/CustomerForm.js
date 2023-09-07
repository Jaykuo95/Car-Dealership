import React, { useState } from "react";

function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.first_name = firstName;
        data.last_name = lastName;
        data.phone_number = phone;
        data.address = address;
        console.log(data);

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhone('');
        };
    };

    return (
        <div className="my-5 container">
            <div className="row" >
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Customer</h1>
                        <form onSubmit={handleSubmit} id="create-customers-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="first_name" className="form-control" />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="last_name" className="form-control" />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneChange} value={phone} placeholder="Phone" required type="text" name="phone" id="phone_number" className="form-control" />
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;