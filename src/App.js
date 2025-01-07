import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adminlogin from './Pages/login/Adminlogin';
import Dashboard from './Pages/Dashboard/Dashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Adminlogin/>}/>
      <Route path="/admin-dashboard" element={<Dashboard/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
