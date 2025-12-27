import React from 'react';
import { ShieldCheck, UserCog, Database, Activity } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <header className="mb-10 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-red-500" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">System Administration</h1>
        </div>
        <p className="text-slate-400 mt-2">Global control panel for GearGuard infrastructure.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
          <UserCog className="text-blue-400 mb-4" />
          <h3 className="font-bold uppercase text-xs tracking-widest text-slate-400">User Management</h3>
          <p className="text-2xl font-bold mt-2">156 Users</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
          <Database className="text-green-400 mb-4" />
          <h3 className="font-bold uppercase text-xs tracking-widest text-slate-400">System Logs</h3>
          <p className="text-2xl font-bold mt-2">Healthy</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
          <Activity className="text-orange-400 mb-4" />
          <h3 className="font-bold uppercase text-xs tracking-widest text-slate-400">Server Load</h3>
          <p className="text-2xl font-bold mt-2">12%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;