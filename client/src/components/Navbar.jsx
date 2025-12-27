import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X, Clock } from 'lucide-react'; // npm install lucide-react

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Hardcoded 'New' requests for the notification feed
  const [notifications] = useState([
    { id: 2, subject: "Monitor Flickering", employee: "Sarah Smith", time: "10m ago" },
    { id: 4, subject: "System Update", employee: "Emily Davis", time: "2h ago" }
  ]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
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

          {/* Notification Bell Section */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-300 hover:text-white transition"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-gray-900">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-800 z-50">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                  <h3 className="font-bold text-gray-700">New Maintenance Requests</h3>
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
                        <button className="mt-3 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800">
                          View Details
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-400 text-sm">
                      No new requests at the moment.
                    </div>
                  )}
                </div>
                <Link 
                  to="/kanban" 
                  onClick={() => setShowNotifications(false)}
                  className="block p-3 text-center text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-b-xl"
                >
                  View All in Kanban
                </Link>
              </div>
            )}
          </div>

          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-700 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;