import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Wrench, RefreshCw } from 'lucide-react';

const KanbanBoard = () => {
  const stages = [
    { id: 'New', color: 'bg-yellow-500' },
    { id: 'In Progress', color: 'bg-blue-500' },
    { id: 'Repaired', color: 'bg-green-500' },
    { id: 'Scrap', color: 'bg-red-500' }
  ];

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA ON MOUNT
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Connects to your backend to get all submitted requests
      const response = await axios.get('http://localhost:5000/api/dashboard/requests');
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setLoading(false);
    }
  };

  // UPDATE STAGE IN DATABASE
  const updateStage = async (requestId, newStage) => {
    try {
      // Sends a PUT request to update the 'stage' column for this specific ID
      await axios.put(`http://localhost:5000/api/dashboard/requests/${requestId}`, { 
        stage: newStage 
      });
      // Immediately refresh the board to show the item in its new column
      fetchRequests();
    } catch (err) {
      console.error("Failed to update ticket stage");
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Pipeline...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Pipeline</h1>
          <p className="text-slate-500 text-sm">Real-time equipment lifecycle management.</p>
        </div>
        <button 
          onClick={fetchRequests} 
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={14} /> Sync Data
        </button>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-8">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            {/* Column Header */}
            <div className={`h-1.5 w-full ${stage.color} rounded-t-lg`}></div>
            <div className="bg-white border-x border-b border-slate-200 p-4 flex justify-between items-center mb-6 shadow-sm">
              <h2 className="font-bold text-slate-700 text-xs uppercase tracking-widest">{stage.id}</h2>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">
                {requests.filter(r => r.stage === stage.id).length}
              </span>
            </div>

            {/* Request Cards inside the Column */}
            <div className="space-y-4">
              {requests.filter(r => r.stage === stage.id).map((req) => (
                <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Building2 size={14} />
                      <span className="text-[10px] font-extrabold uppercase truncate max-w-[150px]">
                        {req.maintenance_team || 'General'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 mb-2 leading-snug">
                    {req.subject}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
                    <Wrench size={14} />
                    <span className="font-medium">{req.equipment_id}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    {/* Status Dropdown: Updates the database instantly */}
                    <select 
                      value={req.stage}
                      onChange={(e) => updateStage(req.id, e.target.value)}
                      className="text-[10px] bg-slate-100 font-bold border-none rounded-lg px-2 py-1 outline-none text-slate-600 cursor-pointer hover:bg-slate-200"
                    >
                      {stages.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                    </select>
                    
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      req.priority === 'Critical' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
                    }`}>
                      {req.priority || 'Medium'}
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