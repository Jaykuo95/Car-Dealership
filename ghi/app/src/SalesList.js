// import React, { useEffect, useState } from "react";

// function SalesList() {
//     const [salesperson, setSalesperson] = useState([]);
//     const [customer, setCustomer] = useState([]);
//     const [automobile, setAutomobile] = useState([]);
//     const [price, setPrice] = useState([]);

//     const getSalespersonData = async () => {
//         const response = await fetch('http://localhost:8090/api/salespeople/');
//         if (response.ok) {
//             const data = await response.json();
//             setSalesperson(data.salesperson.first_name)
//         } else {
//             console.log(response);
//         };
//     };
//     const getCustomerData = async () => {
//         const response = await fetch('http://localhost:8090/api/customers/');
//         if (response.ok) {
//             const data = await response.json();
//             setCustomer(data.customer.first_name)
//         } else {
//             console.log(response);
//         };
//     };
//     const getAutomobileData = async () => {
//         const response = await fetch('http://localhost:8100/api/automobiles/');
//         if (response.ok) {
//             const data = await response.json();
//             setAutomobile(data.autos.vin)
//         } else {
//             console.log(response);
//         };
//     };
//     const getPriceData = async () => {
//         const response = await fetch('http://localhost:8090/api/sales/');
//         if (response.ok) {
//             const data = await response.json();
//             setPrice(data.sales.price)
//         };
//     };


//     useEffect(() => {
//         getSalespersonData();
//         getCustomerData();
//         getAutomobileData();
//         getPriceData();
//     }, []);

//     return (
//         <table className="table table-striped">
//             <thead>
//                 <tr>
//                     <th>Salesperson</th>
//                     <th>Customer</th>
//                     <th>Automobile</th>
//                     <th>Price</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {sales.map(sale => {
//                     return (
//                         <tr key={sale.id}>
//                             <td>{sale.salesperson.first_name}</td>
//                             <td>{sale.customer.first_name}</td>
//                             <td>{sale.automobile.vin}</td>
//                             <td>{sale.price}</td>
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// };

// export default SalesList;

import React, { useEffect, useState } from "react";

function SalesList() {
    const [sales, setSales] = useState([]);

    const getSalesData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        };
    };


    useEffect(() => {
        getSalesData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default SalesList;