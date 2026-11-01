import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/croplogo.png'; // <-- Siguraduhin na croplogo.png ang pangalan

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('Farmer');
  const [userRole, setUserRole] = useState('Farmer');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const name = payload.email.split('@')[0]; 
        setUserName(name);
        setUserRole(payload.role); 
      } catch (e) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-green-800 text-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* LOGO */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center overflow-hidden border-2 border-green-700 shrink-0">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-[130%] h-[130%] object-contain" 
                />
              </div>
              <span className="text-xl font-extrabold tracking-wide">
                Crop<span className="text-green-300">Advisory</span>
              </span>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="hidden md:flex space-x-1 font-medium">
              
              <Link to="/dashboard" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === '/dashboard' ? 'bg-green-900 shadow-inner' : 'hover:bg-green-700'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Dashboard
              </Link>

              {userRole === 'Farmer' && (
                <Link to="/crops" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === '/crops' ? 'bg-green-900 shadow-inner' : 'hover:bg-green-700'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  My Crops
                </Link>
              )}

              <Link to="/weather" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === '/weather' ? 'bg-green-900 shadow-inner' : 'hover:bg-green-700'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                Weather Advisory
              </Link>

              {userRole === 'Admin' && (
                <Link to="/admin" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === '/admin' ? 'bg-green-900 shadow-inner' : 'hover:bg-green-700'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Admin Panel
                </Link>
              )}

            </div>

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-green-700 px-3 py-2 rounded-lg transition"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${userRole === 'Admin' ? 'bg-purple-900 text-purple-200' : 'bg-green-950 text-green-200'}`}>
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block capitalize">{userName}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-700 z-50 border border-gray-100">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {userRole === 'Admin' ? 'Admin Profile' : 'Farmer Profile'}
                  </Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}