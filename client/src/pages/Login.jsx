import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Mail, Lock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
// Points to your photo in the assets folder
import bgImage from '../assets/photo.jpg'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Retrieve the user data saved during Signup
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    const inputEmail = formData.email.toLowerCase();
    const inputPassword = formData.password;

    // 2. Authentication Check
    if (storedUser && inputEmail === storedUser.email && inputPassword === storedUser.password) {
      toast.success(`Access Authorized: Welcome ${storedUser.role}!`);

      // 3. FINAL ROLE-BASED REDIRECTION
      // This ensures Managers go to the Manager Dashboard defined in App.jsx
      if (storedUser.role === 'Manager') {
        navigate('/manager-dashboard');
      } else if (storedUser.role === 'Admin') {
        navigate('/admin-dashboard');
      } else if (storedUser.role === 'Maintenance') {
        navigate('/dashboard'); 
      } else {
        navigate('/requester-dashboard'); 
      }
    } else {
      toast.error("Invalid Credentials. Please check your email and password.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 font-sans relative selection:bg-blue-500 selection:text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand Identity */}
        <div className="md:w-1/2 p-16 flex flex-col justify-center text-white border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-2xl shadow-blue-500/20">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">GEAR<span className="text-blue-500">GUARD</span></h1>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Security Verification</span>
              </div>
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight leading-[1.1]">
                Industrial <br /> Control Center
              </h2>
              <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-sm">
                Enter your credentials to access your designated maintenance workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-16 bg-slate-900/40 flex flex-col justify-center text-left">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="operator@gearguard.com"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-600 font-medium"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Access Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-600 font-medium"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98] uppercase tracking-[0.2em] text-sm"
            >
              Authorize Login
            </button>
          </form>

          <div className="mt-12 flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">New Personnel?</span>
            <Link to="/signup" className="text-blue-400 font-black hover:text-blue-300 transition-colors uppercase tracking-[0.15em] text-[11px] border-b-2 border-blue-400/20 hover:border-blue-300">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;