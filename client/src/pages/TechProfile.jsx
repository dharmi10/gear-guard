import React from 'react';
import { User, Box, PenTool, LayoutDashboard, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TechProfile = () => {
  const navigate = useNavigate();

  const techData = {
    name: "ALEX TECHNICIAN",
    id: "TECH-9921",
    department: "Hardware Maintenance Team B",
    repairedCount: 142,
    activeTasks: "04"
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center selection:bg-blue-100">
      {/* Header with Back Button */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-12">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-[0.2em] transition-all group"
        >
          <LayoutDashboard className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10">
        
        {/* LEFT COLUMN: Identity Card */}
        <div className="md:w-1/3">
          <div className="bg-slate-950 rounded-[3rem] p-12 text-white shadow-2xl flex flex-col items-center text-center sticky top-24">
            <div className="relative mb-8">
              <div className="w-44 h-44 bg-blue-600 rounded-[2.5rem] flex items-center justify-center border-4 border-slate-900 shadow-2xl overflow-hidden">
                <User className="w-24 h-24 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
              {techData.name}
            </h1>
            <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
               <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">
                 Personnel ID: {techData.id}
               </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Horizontal Info Tiles */}
        <div className="md:w-2/3 space-y-6">
          
          {/* Department Tile */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl flex items-center gap-8 border-2 border-transparent hover:border-blue-600 transition-all group">
            <div className="bg-slate-50 p-5 rounded-2xl group-hover:bg-blue-50 transition-colors">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Department Team</p>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{techData.department}</h3>
            </div>
          </div>

          {/* Repaired Units Tile */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl flex items-center gap-8 border-2 border-transparent hover:border-blue-600 transition-all group">
            <div className="bg-slate-50 p-5 rounded-2xl group-hover:bg-blue-50 transition-colors">
              <Box className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Devices Repaired</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">{techData.repairedCount}</h3>
            </div>
          </div>

          {/* Active Tasks Tile */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl flex items-center gap-8 border-2 border-transparent hover:border-blue-600 transition-all group">
            <div className="bg-slate-50 p-5 rounded-2xl group-hover:bg-blue-50 transition-colors">
              <PenTool className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Maintenance Tasks</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">{techData.activeTasks}</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TechProfile;