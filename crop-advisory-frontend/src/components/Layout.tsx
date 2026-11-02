import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/croplogo.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Nakatago sa umpisa
  
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

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    ...(userRole === 'Farmer' ? [{ name: 'My Crops', path: '/crops', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg> }] : []),
    { name: 'Weather Advisory', path: '/weather', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
    ...(userRole === 'Admin' ? [{ name: 'Admin Panel', path: '/admin', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR (Drawer style) */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-green-800 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col w-64 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* LOGO AREA */}
        <div className="h-20 flex items-center justify-between border-b border-green-700/50 px-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 p-1">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold">CropAdvisory</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* NAVIGATION LINKS (Vertical List) */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-green-900 shadow-inner font-bold text-white' : 'hover:bg-green-700 font-medium text-green-100'
                }`}
              >
                <div className="shrink-0">{link.icon}</div>
                <span className="whitespace-nowrap text-lg">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-30">
          
          <div className="flex items-center gap-4">
            {/* HAMBURGER BUTTON WITH "MENU" LABEL */}
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="text-gray-700 hover:text-green-700 focus:outline-none p-2 rounded-lg hover:bg-green-50 transition flex items-center gap-2 border border-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-bold text-sm">Menu</span>
            </button>
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 px-3 py-2 rounded-lg transition border border-transparent hover:border-gray-200"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 capitalize leading-tight">{userName}</p>
                <p className="text-xs text-gray-500 leading-tight">{userRole}</p>
              </div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${userRole === 'Admin' ? 'bg-green-800' : 'bg-green-600'}`}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-700 z-50 border border-gray-100">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Profile Settings
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 relative">
          {children}
        </main>

      </div>
    </div>
  );
}