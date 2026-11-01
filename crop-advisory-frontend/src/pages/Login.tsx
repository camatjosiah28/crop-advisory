import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import riceTerraces from '../assets/riceterraces.jpg';
import logo from '../assets/croplogo.png'; // <-- Import Logo

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex bg-amber-50 font-sans">
      
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
            Smart Farming<br/>Starts Here.
          </h1>
          <p className="text-lg text-green-50 font-medium drop-shadow-md max-w-md">
            Get personalized crop advisory and monitor your farm's health easily.
          </p>
        </div>
      </div>

      {/* KALAHATI: LOGIN FORM */}
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

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8">Log in to your farmer account</p>
          
          {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="juan@example.com"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                placeholder="••••••••"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition text-lg shadow-md mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm mt-8 text-gray-600">
            Don't have an account? <Link to="/register" className="text-green-700 font-bold hover:underline">Register as Farmer</Link>
          </p>
        </div>
      </div>

    </div>
  );
}