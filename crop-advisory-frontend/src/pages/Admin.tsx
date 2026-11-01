import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalAdmins: 0, totalFarmers: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [token, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users/admin/all-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      
      // Kalkulahin ang stats base sa kinuhang users
      const admins = res.data.filter((u: any) => u.role === 'Admin').length;
      const farmers = res.data.filter((u: any) => u.role === 'Farmer').length;
      
      setStats({
        totalUsers: res.data.length,
        totalAdmins: admins,
        totalFarmers: farmers
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Panel</h1>
        <p className="text-gray-500">Manage registered farmers and system data.</p>
      </div>

      {/* ADMIN STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Users</h3>
          <p className="text-4xl font-extrabold text-gray-800 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Farmers Registered</h3>
          <p className="text-4xl font-extrabold text-gray-800 mt-2">{stats.totalFarmers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">System Admins</h3>
          <p className="text-4xl font-extrabold text-gray-800 mt-2">{stats.totalAdmins}</p>
        </div>
      </div>

      {/* REGISTERED USERS TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Registered Users</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100 text-gray-500 text-sm">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Location</th>
                <th className="p-3 font-semibold">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-3 font-bold text-gray-800">{user.fullName}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.role === 'Admin' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{user.location}</td>
                  <td className="p-3 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}