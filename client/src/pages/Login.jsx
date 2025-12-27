import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Mail, Lock } from 'lucide-react';
import bgImage from '../assets/bg-maintanence.jpg'; // Matches explorer filename exactly

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Updates state as the user types
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = formData.email.toLowerCase();

    // Logic to determine which dashboard to open based on email keywords
    // This matches the routes you defined in App.jsx
    if (userEmail.includes('admin')) {
      navigate('/admin-dashboard');
    } else if (userEmail.includes('manager')) {
      navigate('/manager-dashboard');
    } else if (userEmail.includes('tech')) {
      navigate('/dashboard'); // Technician Dashboard
    } else {
      navigate('/requester-dashboard'); // Default Employee Dashboard
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 font-sans relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay to make the glass card pop against the background */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side Content: Brand Identity */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center text-white border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">GEARGUARD</h1>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-300 uppercase tracking-widest leading-tight">
            Maintenance <br /> Control Center
          </h2>
          <p className="text-lg text-slate-200 font-light leading-relaxed">
            Enter your credentials to access your role-specific maintenance hub and manage workflows.
          </p>
        </div>

        {/* Right Side Form: User Interaction */}
        <div className="md:w-1/2 p-12 bg-white/5 flex flex-col justify-center text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@gearguard.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm font-medium">
            Need access? <Link to="/signup" className="text-blue-400 font-black hover:text-blue-300 transition-colors uppercase tracking-widest">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;