import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import { Clock, Building2, User, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';

const KanbanBoard = () => {
  const stages = [
    { id: 'New', color: 'bg-yellow-500' },
    { id: 'In Progress', color: 'bg-blue-500' },
    { id: 'Repaired', color: 'bg-green-500' },
    { id: 'Scrap', color: 'bg-red-500' }
  ];

  // 1. CHANGE: Start with an empty array for dynamic data
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. CHANGE: Fetch real data from your backend on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Replace with your actual backend URL
      const response = await axios.get('http://localhost:5000/api/dashboard/requests');
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dynamic data:", err);
      setLoading(false);
    }
  };

  // 3. CHANGE: Add function to update stage in the database
  const updateStage = async (requestId, newStage) => {
    try {
      await axios.put(`http://localhost:5000/api/dashboard/requests/${requestId}`, { 
        stage: newStage 
      });
      // Refresh data to ensure UI matches DB
      fetchRequests();
    } catch (err) {
      console.error("Failed to update stage in real-time");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading live pipeline...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Pipeline</h1>
          <p className="text-slate-500">Real-time lifecycle management.</p>
        </div>
        <button onClick={fetchRequests} className="text-xs bg-white border px-3 py-1 rounded shadow-sm hover:bg-gray-50">
          Sync Data
        </button>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-8">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className={`h-1.5 w-full ${stage.color} rounded-t-lg`}></div>
            <div className="bg-white border-x border-b border-slate-200 p-3 flex justify-between items-center mb-4 shadow-sm">
              <h2 className="font-bold text-slate-700 text-sm uppercase tracking-widest">{stage.id}</h2>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-xs font-bold">
                {requests.filter(r => r.stage === stage.id).length}
              </span>
            </div>

            <div className="space-y-4">
              {requests.filter(r => r.stage === stage.id).map((req) => (
                <div key={req.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow group">
                  
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Building2 size={16} />
                      <span className="text-xs font-bold truncate max-w-[150px]">{req.company_name || 'N/A'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                       {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 mb-1">
                    {req.subject}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
                    <Wrench size={12} />
                    <span>{req.equipment_name}</span>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
                      <span>Progress</span>
                      <span>{req.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${req.stage === 'Scrap' ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${req.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stage Switcher for Dynamic Control */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <select 
                      value={req.stage}
                      onChange={(e) => updateStage(req.id, e.target.value)}
                      className="text-[10px] bg-slate-100 border-none rounded px-1 outline-none"
                    >
                      {stages.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${
                      req.type === 'Corrective' ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-purple-600 border-purple-200 bg-purple-50'
                    }`}>
                      {req.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;