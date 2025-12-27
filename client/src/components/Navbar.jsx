import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, X, Clock, User, LogOut } from 'lucide-react'; 

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate(); 

  // Hardcoded 'New' requests for the notification feed
  const [notifications] = useState([
    { id: 2, subject: "Monitor Flickering", employee: "Sarah Smith", time: "10m ago" },
    { id: 4, subject: "System Update", employee: "Emily Davis", time: "2h ago" }
  ]);

  const handleLogout = () => {
    // Redirects to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo - Points to Technician Dashboard */}
        <Link to="/dashboard" className="text-2xl font-bold tracking-tighter uppercase">
          GEAR<span className="text-blue-500">GUARD</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/kanban" className="hover:text-blue-400 transition">Kanban Board</Link>
            <Link to="/equipment" className="hover:text-blue-400 transition">Equipment</Link>
            <Link to="/calendar" className="hover:text-blue-400 transition">Calendar</Link>
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 font-bold transition">Admin Panel</Link>
          </div>

          {/* Notifications Section */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-300 hover:text-white transition"
            >
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-gray-900">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-800 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-gray-700 text-xs uppercase tracking-widest">New Requests</h3>
                  <button onClick={() => setShowNotifications(false)}>
                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((note) => (
                      <div key={note.id} className="p-4 border-b hover:bg-blue-50 cursor-pointer transition">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-gray-900">{note.subject}</p>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {note.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Requested by: {note.employee}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-400 text-sm italic">
                      No new requests at this time.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* TECHNICIAN PROFILE BUTTON: Restored Link to /tech-profile */}
          <Link 
            to="/tech-profile" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group border-l border-slate-700 pl-6"
          >
            <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-blue-600 transition shadow-inner">
                <User size={18} className="group-hover:text-white" />
            </div>
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">My Profile</span>
          </Link>

          {/* Logout Button: Redirects to login */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all group"
          >
            <LogOut size={16} className="group-hover:scale-110 transition" />
            <span className="uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;