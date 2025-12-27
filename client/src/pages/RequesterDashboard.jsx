import React from 'react';
import { PlusCircle, ClipboardList, Clock } from 'lucide-react';

const RequesterDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Employee Portal</h1>
          <p className="text-slate-500 text-lg">Submit and track your equipment maintenance requests.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Action Card */}
          <button className="flex flex-col items-center justify-center p-10 bg-blue-600 rounded-[2rem] shadow-xl hover:bg-blue-700 transition-all group active:scale-95">
            <PlusCircle className="w-16 h-16 text-white mb-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-xl font-bold text-white uppercase tracking-widest">Create New Request</span>
          </button>

          {/* Status Tracker Card */}
          <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="flex gap-4 mb-4 text-slate-400">
               <Clock className="w-8 h-8" />
               <ClipboardList className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your Active Requests</h3>
            <p className="text-slate-500 mt-2">No pending repairs at the moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequesterDashboard;