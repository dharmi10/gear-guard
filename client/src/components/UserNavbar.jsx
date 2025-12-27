import React from 'react';
import { Wrench, LogOut, User, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current page is the profile page
  const isProfilePage = location.pathname === '/profile';

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Wrench className="w-5 h-5" />
        </div>
        <span className="font-black tracking-tighter text-xl uppercase">GEARGUARD</span>
      </div>

      <div className="flex items-center gap-6">
        {/* PROFILE TOGGLE BUTTON: Changes based on current page */}
        <div 
          onClick={() => navigate(isProfilePage ? '/requester-dashboard' : '/profile')}
          className={`flex items-center gap-2 cursor-pointer transition-all px-4 py-2 rounded-xl group ${
            isProfilePage 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isProfilePage ? (
            <ArrowLeft className="w-5 h-5 animate-pulse" />
          ) : (
            <User className="w-5 h-5 group-hover:text-blue-400" />
          )}
          
          <span className="text-sm font-bold uppercase tracking-wider">
            {isProfilePage ? 'Back to Dashboard' : 'My Profile'}
          </span>
        </div>

        {/* Logout Button */}
        <button 
          onClick={() => navigate('/login')}
          className="bg-red-500/10 hover:bg-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;