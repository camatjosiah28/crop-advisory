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

// --- CROP GUIDES DATABASE ---
const cropGuides: any = {
  Rice: {
    image: imgRice,
    duration: "110 - 150 days",
    sun: "Full Sun (5-8 hours)",
    water: "High (Keep paddy flooded)",
    tip: "Palay needs consistent water. Monitor for 'tungro' virus which is common during wet season."
  },
  Corn: {
    image: imgCorn,
    duration: "90 - 110 days",
    sun: "Full Sun",
    water: "Moderate (Water every 3-4 days)",
    tip: "Mais is sensitive to waterlogging. Ensure good drainage. Watch out for Fall Armyworms."
  },
  Coconut: {
    image: imgCoconut,
    duration: "6 - 10 years (to first harvest)",
    sun: "Full Sun",
    water: "Low to Moderate (Drought tolerant)",
    tip: "Niyog requires well-drained soil. Fertilize with salt (sodium chloride) occasionally to boost yield."
  },
  Sugarcane: {
    image: imgSugarcane,
    duration: "10 - 12 months",
    sun: "Full Sun",
    water: "High (Needs frequent irrigation)",
    tip: "Tubo needs deep plowing. Watch out for 'smut' disease and borers."
  },
  Banana: {
    image: imgBanana,
    duration: "9 - 12 months",
    sun: "Full Sun to Partial Shade",
    water: "Moderate to High",
    tip: "Saging needs high potassium. Remove dead leaves to prevent disease spread."
  },
  Tomato: {
    image: imgTomato,
    duration: "60 - 85 days",
    sun: "Full Sun",
    water: "Moderate (Avoid overhead watering)",
    tip: "Kamatis is prone to blight. Use trellis to keep fruits off the ground."
  },
  Eggplant: {
    image: imgEggplant,
    duration: "100 - 120 days",
    sun: "Full Sun",
    water: "Moderate",
    tip: "Talong needs staking to support heavy fruits. Prune lower suckers for better growth."
  },
  Cabbage: {
    image: imgCabbage,
    duration: "60 - 100 days",
    sun: "Full Sun",
    water: "Moderate (Moist soil)",
    tip: "Repolyo loves cool climates. Watch out for diamondback moths and aphids."
  }
};

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
      
      {/* WELCOME BANNER */}
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

      {/* STATS CARDS - PARA SA FARMER LANG */}
      {userRole === 'Farmer' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

          {/* CROP LIBRARY / FARMING GUIDE */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Farming Guide & Crop Library</h2>
            <p className="text-gray-500 mb-6">Explore essential tips and requirements for common Philippine crops.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Object.keys(cropGuides).map((cropName) => {
                const guide = cropGuides[cropName];
                return (
                  <div key={cropName} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    
                    {/* IMAGE SECTION */}
                    <div className="h-40 w-full overflow-hidden relative group">
                      <img 
                        src={guide.image} 
                        alt={cropName} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      {/* Gradient overlay para mabasa yung text kung lalagyan mo man */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{cropName}</h3>
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-2">
                        <span className="text-gray-500 font-semibold flex items-center gap-1">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Growth:
                        </span>
                        <span className="text-gray-800 font-medium text-right">{guide.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-2">
                        <span className="text-gray-500 font-semibold flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                          Sun:
                        </span>
                        <span className="text-gray-800 font-medium text-right">{guide.sun}</span>
                      </div>
                      <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-500 font-semibold flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                          Water:
                        </span>
                        <span className="text-gray-800 font-medium text-right">{guide.water}</span>
                      </div>
                    </div>

                    {/* TIP FOOTER */}
                    <div className="bg-green-50 p-4 border-t border-green-100 text-xs text-green-900 leading-relaxed">
                      <strong className="text-green-700">Agri-Tip:</strong> {guide.tip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* QUICK LINKS - PARA SA ADMIN */}
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