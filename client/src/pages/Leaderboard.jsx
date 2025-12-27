import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Award, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Zap, Trophy } from 'lucide-react';

const Leaderboard = () => {
  const navigate = useNavigate();

  // Mock data for the leaderboard
  const technicians = [
    { id: 'TECH-9921', name: 'Alex Technician', repaired: 142, efficiency: 98, level: 7, rank: 1, trend: 'up' },
    { id: 'TECH-8765', name: 'Sarah Jenkins', repaired: 138, efficiency: 96, level: 7, rank: 2, trend: 'down' },
    { id: 'TECH-1234', name: 'Michael Chen', repaired: 125, efficiency: 99, level: 6, rank: 3, trend: 'same' },
    { id: 'TECH-5678', name: 'Emily Davis', repaired: 110, efficiency: 95, level: 6, rank: 4, trend: 'up' },
    { id: 'TECH-4321', name: 'David Lee', repaired: 95, efficiency: 92, level: 5, rank: 5, trend: 'same' },
    { id: 'TECH-9876', name: 'Jessica White', repaired: 88, efficiency: 90, level: 5, rank: 6, trend: 'down' },
  ];

  const alexTechnician = technicians.find(tech => tech.name === 'Alex Technician');

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-amber-400';
      case 2: return 'text-slate-300';
      case 3: return 'text-amber-700';
      default: return 'text-slate-500';
    }
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) return <Trophy className={`w-5 h-5 ${getRankColor(rank)}`} />;
    return <span className="text-slate-500 font-bold ml-1">{rank}</span>;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-emerald-500" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* PURE CSS GRID BACKGROUND (Replaces the missing SVG) */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Header with Back Button */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 relative z-10">
        <button 
          onClick={() => navigate('/tech-profile')} 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-400 font-black uppercase text-[10px] tracking-[0.2em] transition-all group"
        >
          <LayoutDashboard className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Profile
        </button>
        <div className="flex items-center gap-2 text-blue-500">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="font-black uppercase text-[10px] tracking-[0.2em]">Performance Protocol</span>
        </div>
      </div>

      {/* Main Leaderboard Content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
              Technician <span className="text-blue-600">Leaderboard</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-2xl">
              Live ranking of maintenance personnel based on repair volume and task efficiency.
            </p>
        </div>

        {/* Highlighted User Card */}
        {alexTechnician && (
          <div className="w-full bg-blue-600 rounded-[2.5rem] p-1 shadow-2xl mb-10">
            <div className="bg-slate-900 rounded-[2.4rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl font-black shadow-lg">
                        {alexTechnician.rank}
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-black uppercase">{alexTechnician.name}</h2>
                        <p className="text-blue-500 font-bold text-xs tracking-widest uppercase">{alexTechnician.id}</p>
                    </div>
                </div>
                
                <div className="flex gap-12">
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Repaired</p>
                        <p className="text-2xl font-black">{alexTechnician.repaired}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Efficiency</p>
                        <p className="text-2xl font-black">{alexTechnician.efficiency}%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Level</p>
                        <p className="text-2xl font-black text-blue-500">{alexTechnician.level}</p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b">
                <th className="px-8 py-6">Rank</th>
                <th className="px-8 py-6">Technician</th>
                <th className="px-8 py-6 text-center">Repaired</th>
                <th className="px-8 py-6 text-center">Efficiency</th>
                <th className="px-8 py-6 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="text-slate-900">
              {technicians.map((tech) => (
                <tr 
                  key={tech.id} 
                  className={`border-b last:border-0 hover:bg-slate-50 transition-colors ${tech.name === 'Alex Technician' ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        {getRankIcon(tech.rank)}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-sm uppercase">{tech.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{tech.id}</p>
                  </td>
                  <td className="px-8 py-6 text-center font-black">{tech.repaired}</td>
                  <td className="px-8 py-6 text-center font-black">{tech.efficiency}%</td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                        {getTrendIcon(tech.trend)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;