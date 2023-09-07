import React, { useEffect, useState } from "react";

function SalespersonHistory() {
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [sales, setSales] = useState([]);

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }
    const fetchSalespersonData = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salespersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salesperson)
        }
    }
    const fetchSalesData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    useEffect(() => {
        fetchSalespersonData();
        fetchSalesData();
    }, [])

    return (
        <div className="container">
            <div className="row" >
                <div className="mb-3">
                    <div className="shadow p-4 mt-4">
                        <h1>Salesperson History</h1>
                        <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                            <option value="">Choose a Salesperson</option>
                            {salespersons.map(salesperson => {
                                return (
                                    <option key={salesperson.id} value={salesperson.id}>
                                        {salesperson.first_name} {salesperson.last_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {salesperson && (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Salesperson</th>
                                    <th>Customer</th>
                                    <th>VIN</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.filter((sale) => String(sale.salesperson.id) === String(salesperson))
                                    .map(sale => {
                                        return (
                                            <tr key={sale.id}>
                                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                                <td>{sale.automobile.vin}</td>
                                                <td>{sale.price}</td>
                                            </tr>
                                        )
                                    }
                                    )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalespersonHistory;