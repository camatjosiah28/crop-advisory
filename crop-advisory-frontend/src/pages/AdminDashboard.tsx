import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Manage the system, monitor users, and oversee agricultural advisories.</p>
      </div>

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
    </div>
  );
}