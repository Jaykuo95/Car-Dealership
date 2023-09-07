import React, {useEffect, useState} from 'react';

function ModelForm() {
    const [name, setName] = useState('')
    const [picture_url, setPictureUrl] = useState('')
    const [manufacturer_id, setManufacturer] = useState('')
    const [manufacturers, setManufacturers] = useState([])

    useEffect(() => {
        async function getManufacturers() {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
        }
        getManufacturers()
        }, {});

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {
            name,
            picture_url,
            'manufacturer_id': manufacturer_id,
        }

        const vehicleUrl = 'http://localhost:8100/api/models/'
        const options = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                },
            }

            const response = await fetch(vehicleUrl, options)
                if(response.ok) {
                    const newVehicle = await response.json()

                    setName('')
                    setPictureUrl('')
                    setManufacturer('')

                    }
            }

            const handleNameChange = (event) => {
                setName(event.target.value);
            };

            const handlePictureUrlChange = (event) => {
                setPictureUrl(event.target.value);
            };
            const handleManufacturerChange = (event) => {
                setManufacturer(event.target.value);
            };

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='p-4 mt-4'>
                    <h2>Create a vehicle model</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" id="name" value={name} onChange={handleNameChange} placeholder="Name" name="name" className="form-control"/>
                            <label htmlFor="color">Model Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" id="picture_url" value={picture_url} onChange={handlePictureUrlChange} placeholder="picture url" name="picture_url" className="form-control"/>
                            <label htmlFor="picture_url">Picture URL...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="manufacturer_id" value={manufacturer_id} onChange={handleManufacturerChange} multiple={false} name="manufacturer_id" className="form-control">
                            <option value="">Choose a manufacturer...</option>
                            {manufacturers.map((manufacturer) => (
                                <option key={manufacturer_id} value={manufacturer_id}>
                                {manufacturer_id.name}
                                </option>
                            ))}
                            </select>
                            <label htmlFor="model">Manufacturer:</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelForm
