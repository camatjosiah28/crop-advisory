import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [crops, setCrops] = useState<any[]>([]);
  const [advisories, setAdvisories] = useState<any[]>([]);
  const [userName, setUserName] = useState('Farmer');
  const [userRole, setUserRole] = useState('Farmer');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      // Kunin natin yung role at pangalan mula sa token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.email.split('@')[0]);
        setUserRole(payload.role);
      } catch (e) { console.error(e) }

      fetchCrops();
      fetchAdvisories();
    }
  }, [token, navigate]);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:3000/crops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrops(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAdvisories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/advisories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdvisories(res.data);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* WELCOME BANNER - Puro Green na */}
      <div className="bg-green-100 rounded-xl p-8 mb-8 text-center border border-green-200 shadow-sm">
        <h1 className="text-3xl font-extrabold text-green-800 mb-2 capitalize">
          Welcome back, {userRole === 'Admin' ? 'Admin' : userName}!
        </h1>
        <p className="text-green-700">
          {userRole === 'Admin' 
            ? 'Manage the system, monitor users, and oversee agricultural advisories.' 
            : 'Here is the latest overview of your farm\'s health and activities.'}
        </p>
      </div>

      {/* STATS CARDS - PARA SA FARMER LANG ITO */}
      {userRole === 'Farmer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Crops</h3>
            <p className="text-4xl font-extrabold text-gray-800 mt-2">{crops.length}</p>
            <Link to="/crops" className="text-sm text-green-600 font-semibold mt-4 block hover:underline">Manage Crops &rarr;</Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Advisories Generated</h3>
            <p className="text-4xl font-extrabold text-gray-800 mt-2">{advisories.length}</p>
            <Link to="/weather" className="text-sm text-green-600 font-semibold mt-4 block hover:underline">View Advisories &rarr;</Link>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">High Risk Alerts</h3>
            <p className="text-4xl font-extrabold text-gray-800 mt-2">
              {advisories.filter(a => a.riskLevel === 'High').length}
            </p>
            <p className="text-sm text-red-500 font-semibold mt-4 block">Needs attention</p>
          </div>
        </div>
      )}

      {/* QUICK LINKS - PARA SA ADMIN LANG ITO (Puro Green na) */}
      {userRole === 'Admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Link to="/admin" className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col items-center justify-center text-center group">
              <svg className="w-16 h-16 text-green-600 mb-4 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
              <p className="text-gray-500 mt-2">View and manage all registered farmers in the system.</p>
           </Link>
           
           <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center text-center opacity-70">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <h2 className="text-xl font-bold text-gray-800">System Reports</h2>
              <p className="text-gray-500 mt-2">Generate reports (Coming Soon)</p>
           </div>
        </div>
      )}

    </div>
  );
}