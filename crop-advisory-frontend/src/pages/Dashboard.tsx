import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// --- IMPORTS NG MGA PICTURES ---
import imgRice from '../assets/rice.jpg';
import imgCorn from '../assets/corn.jpg';
import imgCoconut from '../assets/coconut.jpg';
import imgSugarcane from '../assets/sugar.jpg';
import imgBanana from '../assets/banana.jpg';
import imgTomato from '../assets/tomato.jpg';
import imgEggplant from '../assets/eggplant.jpg';
import imgCabbage from '../assets/cabbage.jpg';

const cropGuides: any = {
  Rice: { image: imgRice, duration: "110 - 150 days", water: "High (Keep paddy flooded)", tip: "Palay needs consistent water. Monitor for 'tungro' virus." },
  Corn: { image: imgCorn, duration: "90 - 110 days", water: "Moderate", tip: "Mais is sensitive to waterlogging. Watch out for Fall Armyworms." },
  Coconut: { image: imgCoconut, duration: "6 - 10 years", water: "Low to Moderate", tip: "Niyog requires well-drained soil. Fertilize with salt occasionally." },
  Sugarcane: { image: imgSugarcane, duration: "10 - 12 months", water: "High", tip: "Tubo needs deep plowing. Watch out for 'smut' disease." },
  Banana: { image: imgBanana, duration: "9 - 12 months", water: "Moderate to High", tip: "Saging needs high potassium. Remove dead leaves." },
  Tomato: { image: imgTomato, duration: "60 - 85 days", water: "Moderate", tip: "Kamatis is prone to blight. Use trellis." },
  Eggplant: { image: imgEggplant, duration: "100 - 120 days", water: "Moderate", tip: "Talong needs staking to support heavy fruits." },
  Cabbage: { image: imgCabbage, duration: "60 - 100 days", water: "Moderate", tip: "Repolyo loves cool climates. Watch out for aphids." }
};

export default function Dashboard() {
  const [crops, setCrops] = useState<any[]>([]);
  const [advisories, setAdvisories] = useState<any[]>([]);
  const [userName, setUserName] = useState('Farmer');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.email.split('@')[0]);
        // Kung Admin, wag na i-load yung mabigat na Farmer Dashboard
        if (payload.role === 'Admin') {
           navigate('/admin-dashboard');
           return;
        }
      } catch (e) { console.error(e) }

      fetchCrops();
      fetchAdvisories();
    }
  }, [token, navigate]);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:3000/crops', { headers: { Authorization: `Bearer ${token}` } });
      setCrops(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAdvisories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/advisories', { headers: { Authorization: `Bearer ${token}` } });
      setAdvisories(res.data);
    } catch (err) { console.error(err); }
  };

  const latestAdvisory = advisories.length > 0 ? advisories[0] : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      {/* WELCOME BANNER (MINIMALIST) */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-1 capitalize">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-500">Here is the latest overview of your farm's health and activities.</p>
      </div>

      {/* TOP ROW: STATS & MINI WEATHER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* STATS CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-600 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Crops</h3>
              <p className="text-3xl font-extrabold text-gray-800 mt-1">{crops.length}</p>
            </div>
            <Link to="/crops" className="text-sm text-green-600 font-semibold mt-3 hover:underline">Manage Crops &rarr;</Link>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-blue-600 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Advisories</h3>
              <p className="text-3xl font-extrabold text-gray-800 mt-1">{advisories.length}</p>
            </div>
            <Link to="/weather" className="text-sm text-blue-600 font-semibold mt-3 hover:underline">View History &rarr;</Link>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-red-500 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">High Risk Alerts</h3>
              <p className="text-3xl font-extrabold text-gray-800 mt-1">{advisories.filter(a => a.riskLevel === 'High').length}</p>
            </div>
            <span className="text-sm text-red-500 font-semibold mt-3 block">Needs attention</span>
          </div>
        </div>

        {/* MINI WEATHER WIDGET */}
        <div className="bg-blue-600 rounded-xl p-5 shadow-md text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Local Forecast</h3>
            <p className="text-3xl font-extrabold">31°C</p>
            <p className="text-sm text-blue-100 font-medium">Scattered Rain</p>
          </div>
        </div>
      </div>

      {/* LATEST ADVISORY HIGHLIGHT */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          Latest Advisory Alert
        </h2>
        
        {latestAdvisory ? (
          <div className={`p-6 rounded-xl shadow-md border-l-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            latestAdvisory.riskLevel === 'High' ? 'border-red-500 bg-red-50' : 
            latestAdvisory.riskLevel === 'Medium' ? 'border-yellow-500 bg-yellow-50' : 
            'border-green-500 bg-green-50'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-xl font-extrabold ${
                  latestAdvisory.riskLevel === 'High' ? 'text-red-800' : 
                  latestAdvisory.riskLevel === 'Medium' ? 'text-yellow-800' : 
                  'text-green-800'
                }`}>
                  {latestAdvisory.advisoryType}
                </h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  latestAdvisory.riskLevel === 'High' ? 'bg-red-200 text-red-800' : 
                  latestAdvisory.riskLevel === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                  'bg-green-200 text-green-800'
                }`}>
                  {latestAdvisory.riskLevel} Risk
                </span>
              </div>
              <p className="text-gray-800 font-medium text-lg">{latestAdvisory.message}</p>
              <p className="text-sm text-gray-500 mt-2">Crop: {latestAdvisory.crop?.cropType} | {new Date(latestAdvisory.createdAt).toLocaleString()}</p>
            </div>
            <Link to="/weather" className="whitespace-nowrap bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-gray-700 hover:bg-gray-50 transition border border-gray-200">
              View All &rarr;
            </Link>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 border-dashed p-6 rounded-xl text-center">
            <p className="text-gray-500 italic">No advisories generated yet. Go to <Link to="/crops" className="text-green-600 font-bold hover:underline">My Crops</Link> to generate one.</p>
          </div>
        )}
      </div>

      {/* CROP LIBRARY / FARMING GUIDE */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Farming Guide & Crop Library</h2>
        <p className="text-gray-500 mb-6">Explore essential tips and requirements for common Philippine crops.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.keys(cropGuides).map((cropName) => {
            const guide = cropGuides[cropName];
            return (
              <div key={cropName} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-36 w-full overflow-hidden relative">
                  <img src={guide.image} alt={cropName} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{cropName}</h3>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-1">
                    <span className="text-gray-500 font-semibold">Growth:</span>
                    <span className="text-gray-800 font-medium text-right text-xs">{guide.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-1">
                    <span className="text-gray-500 font-semibold">Water:</span>
                    <span className="text-gray-800 font-medium text-right text-xs">{guide.water}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 border-t border-green-100 text-xs text-green-900 leading-relaxed">
                  <strong className="text-green-700">Tip:</strong> {guide.tip}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}