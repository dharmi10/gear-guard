import React from 'react';
import { BarChart3, Users, Settings, FileText } from 'lucide-react';

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Managerial Overview</h1>
        <p className="text-slate-500">System-wide maintenance analytics and team management.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <BarChart3 className="text-blue-600 mb-2" />
          <h3 className="text-slate-500 text-sm font-medium">Efficiency Rate</h3>
          <p className="text-2xl font-bold">94.2%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <Users className="text-purple-600 mb-2" />
          <h3 className="text-slate-500 text-sm font-medium">Active Technicians</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <FileText className="text-orange-600 mb-2" />
          <h3 className="text-slate-500 text-sm font-medium">Pending Approvals</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;