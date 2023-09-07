import React, {useEffect, useState} from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [searchInput, SetSearchInput] = useState('')

    const loadAppointments = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        loadAppointments();
    }, [])

    const handleInputChange = (event) => {
        const value = event.target.value;
        SetSearchInput(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments.filter((appointment) => appointment.vin===searchInput))
        }
    }

    return (
        <div>
            <h1>Service Appointments</h1>
            <div>
                <form onSubmit={handleSubmit} id="search-bar">
                    <input value={searchInput} onChange={handleInputChange} type="text" placeholder="Search by VIN..." />
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{String(appointment.is_vip)}</td>
                                <td>{appointment.customer}</td>
                                <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;
