import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Mail, Lock, User, Briefcase, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import bgImage from '../assets/photo.jpg'; 

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Employee' });
  const [strength, setStrength] = useState({ score: 0, label: '', color: 'bg-slate-700' });
  const navigate = useNavigate();

  // Password Strength Logic
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length > 7) score++; // Length check
    if (/[A-Z]/.test(pass)) score++; // Uppercase check
    if (/[0-9]/.test(pass)) score++; // Number check
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Special char check

    const levels = [
      { label: 'Weak', color: 'bg-red-500' },
      { label: 'Fair', color: 'bg-orange-500' },
      { label: 'Good', color: 'bg-yellow-500' },
      { label: 'Strong', color: 'bg-emerald-500' }
    ];

    if (pass.length === 0) {
      setStrength({ score: 0, label: '', color: 'bg-slate-700' });
    } else {
      setStrength({ score, ...levels[score - 1] || levels[0] });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      calculateStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Safety check: Block weak passwords
    if (strength.score < 2) {
      toast.error("Password is too weak for industrial access.");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email.toLowerCase(),
      password: formData.password,
      role: formData.role
    };

    localStorage.setItem('registeredUser', JSON.stringify(userData));
    toast.success("Account Registered Successfully!");
    navigate('/login'); 
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 font-sans relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Branding Side */}
        <div className="md:w-5/12 p-16 flex flex-col justify-center text-white border-b md:border-b-0 md:border-r border-white/10 bg-blue-600/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-2xl shadow-blue-500/20">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">GEAR<span className="text-blue-500">GUARD</span></h1>
          </div>
          <h2 className="text-3xl font-black mb-6 text-white uppercase tracking-tight leading-[1.1]">Join the <br /> Maintenance Guard</h2>
          <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-sm">
            Establish your identity within the Industrial Control Centre to manage and monitor critical assets.
          </p>
        </div>

        {/* Right Form Side */}
        <div className="md:w-7/12 p-16 bg-slate-900/40 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" name="name" required placeholder="John Doe" className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium" onChange={handleChange} />
              </div>
            </div>

            {/* Work Email */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input type="email" name="email" required placeholder="name@company.com" className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium" onChange={handleChange} />
              </div>
            </div>

            {/* Role Selection */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left">Designated Role</label>
              <div className="relative group">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <select name="role" value={formData.role} className="w-full pl-14 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white/10 appearance-none transition-all cursor-pointer font-medium" onChange={handleChange}>
                  <option className="bg-slate-900 text-white" value="Employee">Employee (Requester)</option>
                  <option className="bg-slate-900 text-white" value="Maintenance">Maintenance (Tech)</option>
                  <option className="bg-slate-900 text-white" value="Manager">Operations Manager</option>
                  <option className="bg-slate-900 text-white" value="Admin">System Administrator</option>
                </select>
              </div>
            </div>

            {/* Password Field with Strength Meter */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-left">Access Password</label>
              <div className="relative group mb-1">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input type="password" name="password" required placeholder="••••••••••••" className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium" onChange={handleChange} />
              </div>
              
              {/* Strength Meter Bars */}
              {formData.password && (
                <div className="px-1 space-y-1.5 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Security Level: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span></span>
                    <span className="text-slate-500">{strength.score}/4 Requirements</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`h-full flex-1 transition-all duration-500 ${step <= strength.score ? strength.color : 'bg-transparent opacity-20'}`} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98] uppercase tracking-[0.2em] text-sm">
                Register Personnel
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <span className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Already have an ID? </span>
            <Link to="/login" className="text-blue-400 font-black hover:text-blue-300 transition-colors uppercase tracking-[0.15em] text-[11px] border-b-2 border-blue-400/20 hover:border-blue-300">
              Authorize Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;