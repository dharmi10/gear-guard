import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Search, MoreHorizontal, Wrench, 
  Settings, Filter, Download, Edit2 
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Scrapped': 'bg-rose-50 text-rose-700 border-rose-100',
    'Maintenance': 'bg-amber-50 text-amber-700 border-amber-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
};

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace URL with your actual API endpoint
    axios.get('http://localhost:5000/api/equipment')
      .then(res => {
        setEquipment(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Equipment Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage company assets and maintenance assignments.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
          <Plus size={18} />
          Add Equipment
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4 text-center w-12">#</th>
                <th className="px-6 py-4">Equipment</th>
                <th className="px-6 py-4">Serial Number</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Warranty</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipment.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-xs text-center">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 text-sm">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.assigned_to || 'Unassigned'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{item.serial_number}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.department}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-rose-500 font-medium">{item.warranty_expiry}</td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
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

export default EquipmentManagement;