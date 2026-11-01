import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState<any>({ email: '', role: '', fullName: '', location: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // State para sa Snackbar
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchProfile();
    }
  }, [token, navigate]);

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, show: false }), 3000);
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users/profile-data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditName(res.data.fullName || '');
      setEditLocation(res.data.location || '');
    } catch (e) {
      console.error('Failed to fetch profile', e);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axios.patch('http://localhost:3000/users/update-profile', {
        fullName: editName,
        location: editLocation,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUser({ ...user, fullName: res.data.fullName, location: res.data.location });
      setIsEditModalOpen(false);
      showSnackbar('Profile updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to save profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      
      {/* SNACKBAR COMPONENT */}
      <div 
        className={`fixed bottom-6 right-6 z-[110] transform transition-all duration-300 ease-in-out ${
          snackbar.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex items-center p-4 rounded-lg shadow-2xl text-white ${snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {snackbar.type === 'success' ? (
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-semibold text-sm">{snackbar.message}</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Farmer Profile</h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="h-32 bg-green-600 w-full"></div>
        
        <div className="px-8 pb-8 relative">
          <div className="w-24 h-24 bg-green-100 text-green-700 rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold shadow-md -mt-12 mb-4 capitalize">
            {user.fullName ? user.fullName.charAt(0) : 'F'}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{user.fullName}</h2>
              <p className="text-gray-500">{user.email}</p>
              
              <div className="mt-4 flex gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {user.role}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Farm Location</p>
              <p className="text-gray-800 font-medium">{user.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">System Role</p>
              <p className="text-gray-800 font-medium capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-green-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Profile Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Farm Location</label>
                <input 
                  type="text" 
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}