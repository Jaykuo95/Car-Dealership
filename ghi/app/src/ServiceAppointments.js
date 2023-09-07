import React, { useState, useEffect } from 'react';

function ServiceAppointments() {
    const [appointments, setAppointments] = useState([]);

    const loadAppointments = async() => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        loadAppointments();
    } ,[])

    const finishAppointment = async (id) => {
        const data = {};

        data.status = "Finished";

        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(appointmentUrl, fetchConfig)

        loadAppointments()
    }

    const cancelAppointment = async (id) => {
        const data = {};

        data.status = "Canceled";

        const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fetchConfig ={
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(appointmentUrl, fetchConfig)

        loadAppointments()
    }

    return (
        <div>
            <h1>Service Appointments</h1>
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
                    {appointments.filter(appointment => appointment.status==="Created").map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{String(appointment.is_vip)}</td>
                                <td>{appointment.customer}</td>
                                <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button onClick={() => finishAppointment(appointment.id)} type="button" className="btn btn-success btn-sm">Finish</button>
                                    <button onClick={() => cancelAppointment(appointment.id)} type="button" className="btn btn-danger btn-sm">Cancel</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceAppointments;
