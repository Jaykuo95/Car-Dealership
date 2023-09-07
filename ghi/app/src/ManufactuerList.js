import React, { useEffect, useState } from "react";

function ManufacturerList() {
    const [manufacturers, setManufacurers] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            setManufacurers(data.manufacturers)
        } else {
            console.log(response);
        };
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturers</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>

                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ManufacturerList;