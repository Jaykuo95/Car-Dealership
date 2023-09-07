import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonList from './SalespersonList';
import SalespersonForm from './SalespersonForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import SalesHistory from './SalesHistory';
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentForm from "./AppointmentForm"
import AppointmentList from "./ServiceAppointments"
import ServiceHistory from './ServiceHistory';
import ModelList from './ModelList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/">
            <Route index element={<SalespersonList />} />
            <Route path="create/" element={<SalespersonForm />} />
          </Route>
          <Route path="customers/">
            <Route index element={<CustomerList />} />
            <Route path="create/" element={<CustomerForm />} />
          </Route>
          <Route path="sales/">
            <Route index element={<SalesList />} />
            <Route path="create/" element={<SalesForm />} />
            <Route path="history/" element={<SalesHistory />} />
          </Route>
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistory />} />
          <Route path="models" element={<ModelList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
