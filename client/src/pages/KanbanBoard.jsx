import React, { useState } from 'react';
import { Clock, Building2, User, Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';

const KanbanBoard = () => {
  // 1. Progress Stages at the top 
  const stages = [
    { id: 'New', color: 'bg-yellow-500' },
    { id: 'In Progress', color: 'bg-blue-500' },
    { id: 'Repaired', color: 'bg-green-500' },
    { id: 'Scrap', color: 'bg-red-500' }
  ];

  // Hardcoded rows with Company Name, Submission Date, and Progress [cite: 11, 31, 34]
  const [requests] = useState([
  // NEW STAGE
  {
    id: 1,
    subject: "CNC Machine Leaking Oil",
    company: "Production Dept - Factory A",
    submittedDate: "2025-12-25",
    technician: "Mike Mech",
    equipment: "CNC-X900",
    category: "Hardware",
    type: "Corrective",
    progress: 10,
    stage: "New"
  },
  {
    id: 3,
    subject: "Forklift Battery Failure",
    company: "Logistics - Warehouse 2",
    submittedDate: "2025-12-27",
    technician: "Sarah Volt",
    equipment: "Toyota High-Lift",
    category: "Vehicles",
    type: "Corrective",
    progress: 0,
    stage: "New"
  },
  // IN PROGRESS STAGE
  {
    id: 2,
    subject: "Quarterly IT Server Check",
    company: "Corporate HQ - IT",
    submittedDate: "2025-12-20",
    technician: "Alex Support",
    equipment: "Server Rack 04",
    category: "Infrastructure",
    type: "Preventive",
    progress: 60,
    stage: "In Progress"
  },
  {
    id: 4,
    subject: "AC Unit Filter Replacement",
    company: "HR Dept - Office B",
    submittedDate: "2025-12-24",
    technician: "Dave Air",
    equipment: "Carrier Split AC",
    category: "Facilities",
    type: "Preventive",
    progress: 45,
    stage: "In Progress"
  },
  // REPAIRED STAGE
  {
    id: 5,
    subject: "Hydraulic Press Repair",
    company: "Production Dept - Factory A",
    submittedDate: "2025-12-18",
    technician: "Mike Mech",
    equipment: "H-Press 200",
    category: "Hardware",
    type: "Corrective",
    progress: 100,
    stage: "Repaired"
  },
  {
    id: 6,
    subject: "Laptop Screen Replacement",
    company: "Sales Team - Remote",
    submittedDate: "2025-12-22",
    technician: "Alex Support",
    equipment: "Dell XPS 15",
    category: "Computers",
    type: "Corrective",
    progress: 100,
    stage: "Repaired"
  },
  // SCRAP STAGE
  {
    id: 7,
    subject: "Total Engine Seizure",
    company: "Logistics - Delivery",
    submittedDate: "2025-12-15",
    technician: "Sarah Volt",
    equipment: "Transit Van 09",
    category: "Vehicles",
    type: "Corrective",
    progress: 20,
    stage: "Scrap"
  }
]);
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Maintenance Pipeline</h1>
        <p className="text-slate-500">Manage repair lifecycles and asset status[cite: 26].</p>
      </header>

      {/* Kanban Grid */}
      <div className="flex gap-6 overflow-x-auto pb-8">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            {/* Stage Header at the Top  */}
            <div className={`h-1.5 w-full ${stage.color} rounded-t-lg`}></div>
            <div className="bg-white border-x border-b border-slate-200 p-3 flex justify-between items-center mb-4 shadow-sm">
              <h2 className="font-bold text-slate-700 text-sm uppercase tracking-widest">{stage.id}</h2>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-xs font-bold">
                {requests.filter(r => r.stage === stage.id).length}
              </span>
            </div>

            {/* Column Body */}
            <div className="space-y-4">
              {requests.filter(r => r.stage === stage.id).map((req) => (
                <div key={req.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow group">
                  
                  {/* Company Name & Date Section [cite: 11, 34] */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Building2 size={16} />
                      <span className="text-xs font-bold truncate max-w-[150px]">{req.company}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{req.submittedDate}</span>
                  </div>

                  {/* Subject [cite: 31] */}
                  <h3 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {req.subject}
                  </h3>
                  
                  {/* Equipment Detail [cite: 16] */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
                    <Wrench size={12} />
                    <span>{req.equipment} • {req.category}</span>
                  </div>

                  {/* Progress Bar Logic [cite: 45] */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
                      <span>Progress</span>
                      <span>{req.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${req.stage === 'Scrap' ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${req.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer: Technician & Type Badge [cite: 12, 27] */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] text-white">
                        <User size={12} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-600">{req.technician}</span>
                    </div>
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