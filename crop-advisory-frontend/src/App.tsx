import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard'; // <-- Idagdag
import Crops from './pages/Crops'; 
import Weather from './pages/Weather'; 
import Profile from './pages/Profile'; 
import Admin from './pages/Admin'; 
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} /> {/* <-- Bagong Route */}
        
        <Route path="/crops" element={<Layout><Crops /></Layout>} />
        <Route path="/weather" element={<Layout><Weather /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;