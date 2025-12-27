import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ scrapCount: 0, pendingCount: 0, utilization: 0 });
  const [loading, setLoading] = useState(true);

  // 1. Fetch real-time data from Backend on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetches the dynamic counts for the colored boxes
      const statsRes = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(statsRes.data);

      // Fetches all maintenance requests for the table
      const requestsRes = await axios.get('http://localhost:5000/api/dashboard/requests');
      setRequests(requestsRes.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      toast.error("Failed to load real-time data");
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading live updates...</div>;

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Technician Dashboard</h1>
        <button 
          onClick={fetchDashboardData}
          className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
        >
          Refresh Data
        </button>
      </div>
      
      {/* 1. Dynamic Metric Boxes (connected to stats endpoint) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg shadow-red-100 transition-transform hover:scale-[1.02]">
          <h3 className="font-bold opacity-80 uppercase text-xs tracking-widest">Scrap Assets</h3>
          <p className="text-4xl font-black mt-2">{stats.scrapCount}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg shadow-green-100 transition-transform hover:scale-[1.02]">
          <h3 className="font-bold opacity-80 uppercase text-xs tracking-widest">Pending & Overdue</h3>
          <p className="text-4xl font-black mt-2">{stats.pendingCount}</p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-100 transition-transform hover:scale-[1.02]">
          <h3 className="font-bold opacity-80 uppercase text-xs tracking-widest">Workforce Utilization</h3>
          <p className="text-4xl font-black mt-2">{stats.utilization}%</p>
        </div>
      </div>

      {/* 2. Live Maintenance Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Maintenance Requests</h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            {requests.length} Total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
                <th className="p-6">Subject & Team</th>
                <th className="p-6">Equipment ID</th>
                <th className="p-6">Technician</th>
                <th className="p-6">Stage</th>
                <th className="p-6">Priority</th>
                <th className="p-6 text-right">Scheduled Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6 font-medium">
                    <div className="text-sm text-gray-900">{req.subject}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">{req.maintenance_team}</div>
                  </td>
                  <td className="p-6 text-sm text-gray-500 font-mono">{req.equipment_id}</td>
                  <td className="p-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold">
                      {req.technician_name || "Unassigned"}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                      req.stage === 'New' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      req.stage === 'Repaired' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {req.stage}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`text-[11px] font-bold ${
                      req.priority === 'Critical' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {req.priority || "Medium"}
                    </span>
                  </td>
                  <td className="p-6 text-right text-xs text-gray-400 font-medium">
                    {new Date(req.scheduled_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-400 italic">
                    No requests found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;