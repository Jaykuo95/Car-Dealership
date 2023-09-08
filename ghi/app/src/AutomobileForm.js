import React, { useEffect, useState } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const getData = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(modelsUrl);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.model_id = model;
        data.color = color;
        data.year = year;
        data.vin = vin

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);
            setModel('');
            setColor('');
            setYear('');
            setVin('');
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add an automobile to inventory</h1>
                        <form onSubmit={handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleColorChange} value={color} placeholder="Color" type="text" name="color" id="color" className="form-control" />
                                <label forhtml="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleYearChange} value={year} placeholder="Year" type="text" name="year" id="year" className="form-control" />
                                <label forhtml="year">year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleVinChange} value={vin} placeholder="Vin" type="text" name="vin" id="vin" className="form-control" />
                                <label forhtml="vin">VIN</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleModelChange} value={model} required id="model_id" name="model" className="form-select">
                                    <option value="">Choose a Model</option>
                                    {models.map(model => {
                                        return (
                                            <option key={model.id} value={model.id}>
                                                {model.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomobileForm;