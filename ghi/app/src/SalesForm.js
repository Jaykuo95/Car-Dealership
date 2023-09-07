import React, { useEffect, useState } from 'react';

function SalesForm() {

    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const [sales, setSales] = useState([]);
    const [price, setPrice] = useState('');

    const handleAutomobileChange = (event) => {
        setAutomobile(event.target.value);
    }
    const handleSalespersonChange = (event) => {
        setSalesperson(event.target.value);
    }
    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const fetchSalesData = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        const response = await fetch(salesUrl);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    const fetchAutomobilesData = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(automobilesUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    const fetchSalespersonData = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salespersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salesperson)
        }
    }

    const fetchCustomerData = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const response = await fetch(customerUrl);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customer)
        }
    }

    useEffect(() => {
        fetchAutomobilesData();
        fetchSalespersonData();
        fetchCustomerData();
        fetchSalesData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.automobile = automobile;
        data.customer = customer;
        data.salesperson = salesperson;
        data.price = price;
        console.log(data);

        const salesRecordUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);

            setAutomobiles(auto => {
                return auto.filter(auto => auto.vin !== automobile)
            })

            setAutomobile('');
            setCustomer('');
            setSalesperson('');
            setPrice('');
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Sale</h1>
                        <form onSubmit={handleSubmit} id="create-sale-form">
                            <div className="mb-3">
                                <select onChange={handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                                    <option value="">Choose an automobile VIN</option>
                                    {automobiles.filter((auto) => {
                                        return !sales.some(sale => sale.automobile.vin === auto.vin)
                                    }).map(auto => {
                                        return (
                                            <option key={auto.vin} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
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
                            <div className="mb-3">
                                <select onChange={handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                                    <option value="">Choose a Customer</option>
                                    {customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.first_name} {customer.last_name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePriceChange} value={price} placeholder="Price" type="text" name="price" id="price" className="form-control" />
                                <label forhtml="price">Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SalesForm
