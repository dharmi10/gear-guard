import React from 'react';
import { 
  User, Mail, Building2, Settings, History, HardDrive, LogOut, Camera 
} from 'lucide-react';
import UserNavbar from '../components/UserNavbar'; // Corrected import to use UserNavbar

const MyProfile = () => {
  /** * Statistics grid optimized to 3 items 
   * This matches the square layout you requested earlier
   */
  const userStats = [
    { label: 'Machines Sent', value: '12', icon: <HardDrive className="text-blue-600 w-6 h-6" /> },
    { label: 'Repairs Completed', value: '09', icon: <History className="text-green-600 w-6 h-6" /> },
    { label: 'Current Active', value: '03', icon: <Settings className="text-orange-600 animate-spin w-6 h-6" /> },
  ];

  /** * User data object 
   * The 'company' field now reflects the data entered in the form
   */
  const userData = {
    name: "JUSTIN MASON",
    email: "justin@company.com",
    company: "GEAR-GUARD INDUSTRIES" 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Custom User Navbar specifically for the Requester side */}
      <UserNavbar />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Identity Card (Dark Mode Design) */}
          <div className="lg:w-1/3">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col items-center text-center">
              <div className="relative group">
                {/* Profile Image Placeholder */}
                <div className="w-40 h-40 bg-blue-600 rounded-[2.5rem] flex items-center justify-center border-4 border-slate-800 shadow-xl overflow-hidden">
                  <User className="w-20 h-20 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white text-slate-900 p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h1 className="mt-6 text-3xl font-black uppercase tracking-tighter">{userData.name}</h1>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-1">Equipment Requester</p>
              
              <div className="w-full mt-10 space-y-4 text-left">
                {/* Email Display */}
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium">{userData.email}</span>
                </div>
                
                {/* Dynamic Company Name Display */}
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-blue-500/20">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold uppercase tracking-tight">{userData.company}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button className="w-full mt-10 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" /> Logout Session
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Stats Grid & Settings */}
          <div className="lg:w-2/3 space-y-8 text-left">
            
            {/* Square Stats Grid (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-blue-600 transition-all aspect-square flex flex-col justify-center items-center text-center group">
                  <div className="bg-slate-50 p-5 rounded-2xl mb-4 shadow-inner group-hover:bg-blue-50 transition-colors">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.value}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Account Settings Section */}
            <div className="bg-white rounded-[3rem] p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Account Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Notification Toggle */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Notification Alerts</label>
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-bold text-slate-700">Status Updates</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Security Section */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Security</label>
                  <button className="w-full text-left p-5 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors border-l-4 border-blue-600 flex justify-between items-center group">
                    Update Password
                    <Settings className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;