import React, { useEffect, useState } from "react";

function SalespersonList() {
    const [salesperson, setSalesperson] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee Id</th>
                </tr>
            </thead>
            <tbody>
                {salesperson.map(salesperson => {
                    return (
                        <tr key={salesperson.id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default SalespersonList;