import React, { useState } from "react";

function ManufacturerForm() {
    const [manufacturer, setManufacurer] = useState('');

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacurer(value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = manufacturer;
        console.log(data);

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);
            setManufacurer('');
        };
    };

    return (
        <div className="my-5 container">
            <div className="row" >
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="name" className="form-control" />
                                <label htmlFor="manufacturer">Manufacturer Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManufacturerForm;