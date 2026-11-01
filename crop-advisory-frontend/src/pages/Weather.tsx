import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Weather() {
  const [advisories, setAdvisories] = useState<any[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchAdvisories();
    }
  }, [token, navigate]);

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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Weather Advisory</h1>
        <p className="text-gray-500">Monitor weather risks and generated advisories for your crops.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* MOCK WEATHER WIDGET (Pang-display lang) */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 h-fit md:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Local Forecast
          </h2>
          <div className="text-center py-6 bg-blue-50 rounded-lg">
            <p className="text-4xl font-bold text-blue-800">31°C</p>
            <p className="text-blue-600 font-semibold mt-1">Scattered Rain</p>
            <p className="text-sm text-gray-500 mt-2">Humidity: 82%</p>
            <p className="text-sm text-gray-500">Wind: 12 km/h</p>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4 italic">*Mock data for demonstration. Live API integration coming soon.</p>
        </div>

        {/* ADVISORY HISTORY LIST */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Advisories</h2>
          
          {advisories.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">No advisories generated yet.</p>
              <button onClick={() => navigate('/crops')} className="mt-4 text-blue-600 font-bold hover:underline">
                Go to My Crops to generate one
              </button>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {advisories.map((adv) => (
                <div key={adv.advisoryId} className={`p-4 rounded-lg border-l-4 ${adv.riskLevel === 'High' ? 'border-red-500 bg-red-50' : adv.riskLevel === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 'border-green-500 bg-green-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       {adv.riskLevel === 'High' && <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                       {adv.riskLevel === 'Medium' && <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                       {adv.riskLevel === 'Low' && <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                       <p className="font-bold text-gray-800 text-lg">{adv.advisoryType}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${adv.riskLevel === 'High' ? 'bg-red-200 text-red-800' : adv.riskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                      {adv.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-gray-700">{adv.message}</p>
                  <div className="mt-3 flex justify-between items-center text-xs text-gray-500 border-t border-gray-200/50 pt-2">
                    <span>Crop: <strong className="text-gray-700">{adv.crop?.cropType}</strong></span>
                    <span>{new Date(adv.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}