import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonList from './SalespersonList';
import SalespersonForm from './SalespersonForm';
import TechnicianForm from "./TechnicianForm";


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
          <Route path="technicians/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
