import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Crops() {
  const [crops, setCrops] = useState<any[]>([]);
  // Nilagyan natin ng default value na 'Rice'
  const [formData, setFormData] = useState({ cropType: 'Rice', plantingDate: '', location: '' });
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchCrops();
    }
  }, [token, navigate]);

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, show: false }), 3000);
  };

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:3000/crops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrops(res.data);
    } catch (err) { console.error(err); }
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/crops', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ cropType: 'Rice', plantingDate: '', location: '' }); // Reset
      showSnackbar('Crop added successfully!', 'success');
      fetchCrops();
    } catch (err) { 
      showSnackbar('Failed to add crop.', 'error'); 
    }
  };

  const handleGenerateAdvisory = async (cropId: number) => {
    try {
      await axios.post(`http://localhost:3000/advisories/generate/${cropId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar('Advisory generated! Check your dashboard.', 'success');
    } catch (err) { 
      showSnackbar('Failed to generate advisory.', 'error'); 
    }
  };

  return (
    <div className="relative p-6 max-w-6xl mx-auto">
      
      {/* SNACKBAR COMPONENT */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-in-out ${
          snackbar.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex items-center p-4 rounded-lg shadow-2xl text-white ${snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          <span className="font-semibold text-sm">{snackbar.message}</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Crop Management</h1>
        <p className="text-gray-500">Add and monitor all your planted crops here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ADD CROP FORM */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-600 h-fit md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">Add New Crop</h2>
          </div>
          <form onSubmit={handleAddCrop} className="space-y-4">
            
            {/* DROPDOWN PARA SA CROP TYPE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Select Crop Type</label>
              <select 
                value={formData.cropType} 
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white cursor-pointer" 
                required
              >
                <option value="Rice">Rice (Palay)</option>
                <option value="Corn">Corn (Mais)</option>
                <option value="Coconut">Coconut (Niyog)</option>
                <option value="Sugarcane">Sugarcane (Tubo)</option>
                <option value="Banana">Banana (Saging)</option>
                <option value="Tomato">Tomato (Kamatis)</option>
                <option value="Eggplant">Eggplant (Talong)</option>
                <option value="Cabbage">Cabbage (Repolyo)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Planting Date</label>
              <input 
                type="date" 
                value={formData.plantingDate} 
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-600" required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Farm Location</label>
              <input 
                type="text" 
                placeholder="e.g., Cavite, Iloilo" 
                value={formData.location} 
                onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required 
              />
            </div>

            <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition">
              Save Crop
            </button>
          </form>
        </div>

        {/* LIST OF CROPS */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Crop Inventory</h2>
          
          {crops.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">You haven't added any crops yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-gray-500 text-sm">
                    <th className="p-3 font-semibold">Crop Type</th>
                    <th className="p-3 font-semibold">Planted Date</th>
                    <th className="p-3 font-semibold">Location</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop.cropId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="p-3 font-bold text-green-800">{crop.cropType}</td>
                      <td className="p-3 text-gray-600">{crop.plantingDate}</td>
                      <td className="p-3 text-gray-600">{crop.location}</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                          {crop.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => handleGenerateAdvisory(crop.cropId)} 
                          className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                          Get Advisory
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}