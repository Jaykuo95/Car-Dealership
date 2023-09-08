import React, { useEffect, useState } from "react";

function AutomobileList() {
    const [automobile, setAutomobile] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutomobile(data.autos)
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
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {automobile.map(autos => {
                    return (
                        <tr key={autos.id}>
                            <td>{autos.vin}</td>
                            <td>{autos.color}</td>
                            <td>{autos.year}</td>
                            <td>{autos.model.name}</td>
                            <td>{autos.model.manufacturer.name}</td>
                            <td>{autos.sold ? "Yes" : "No"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AutomobileList;