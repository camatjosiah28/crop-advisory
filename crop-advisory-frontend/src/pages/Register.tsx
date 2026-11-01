import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import riceTerraces from '../assets/riceterraces.jpg';
import logo from '../assets/croplogo.png'; // <-- Import Logo

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: '',
  });
  const [error, setError] = useState('');
  
  // State para sa Snackbar
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate();

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ show: true, message, type });
    setTimeout(() => {
      setSnackbar({ ...snackbar, show: false });
      if (type === 'success') navigate('/login');
    }, 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', formData);
      showSnackbar('Registration successful! Redirecting to login...', 'success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
      showSnackbar('Registration failed. Try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex bg-amber-50 font-sans relative">
      
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

      {/* KALAHATI: LARAWAN (Rice Terraces) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src={riceTerraces} 
          alt="Rice Terraces" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-green-950/50"></div> 
        
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white z-10">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-xl">
            Join the<br/>Farming Community.
          </h1>
          <p className="text-lg text-green-50 font-medium drop-shadow-md max-w-md">
            Create your account today and start receiving personalized crop advisories.
          </p>
        </div>
      </div>

      {/* KALAHATI: REGISTER FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-8 border-green-700">
          
          {/* LOGO SA TAAS NG FORM */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg overflow-hidden flex items-center justify-center border-4 border-green-50 p-2">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
          <p className="text-center text-gray-500 mb-8">Register as a new farmer</p>
          
          {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="Juan Dela Cruz"
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="juan@example.com"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="••••••••"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Farm Location</label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="e.g., Iloilo, Cavite"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition text-lg shadow-md mt-6"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account? <Link to="/login" className="text-green-700 font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </div>

    </div>
  );
}