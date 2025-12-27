import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Plus, MoreHorizontal, Wrench, Download, ChevronDown } from 'lucide-react';

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Replace with your actual backend URL (usually http://localhost:5000/api/requests)
        const response = await axios.get('http://localhost:3000/api/requests');
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Maintenance Data...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Maintenance Requests</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> New Request
        </button>
      </div>

      {/* Dynamic Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-[11px] uppercase font-bold">
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Equipment</th>
              <th className="px-6 py-4">Technician</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-medium">{req.subject}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{req.equipment_name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{req.technician_name}</td>
                <td className="px-6 py-4 text-sm">{req.status}</td>
                <td className="px-6 py-4 text-sm font-bold text-orange-600">{req.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceRequests;