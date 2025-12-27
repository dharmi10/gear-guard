import React, { useState } from 'react';
import { 
  AlertTriangle, Send, Clock, User, 
  Wrench, ChevronRight, BellRing, Filter,
  ShieldAlert, Activity, Hammer, Settings
} from 'lucide-react';

const ManagerDashboard = () => {
  // --- EXPANDED DATASET (12 ENTRIES) ---
  const [requests] = useState([
    {
      id: "101",
      request_number: "REQ-2025-0901",
      subject: "Main Boiler Pressure Valve Leak",
      equipment_name: "Industrial Steam Boiler B-02",
      requester_name: "John Smith",
      technician_name: "Emily Davis",
      technician_id: "tech_01",
      stage_name: "In Progress",
      priority: "high",
      scheduled_date: "2025-12-20", // OVERDUE
      created_at: "2025-12-18",
      is_overdue: true
    },
    {
      id: "102",
      request_number: "REQ-2025-0902",
      subject: "Hydraulic Fluid Contamination",
      equipment_name: "Injection Mold Press #04",
      requester_name: "Michael Chen",
      technician_name: "Robert Kim",
      technician_id: "tech_02",
      stage_name: "New",
      priority: "medium",
      scheduled_date: "2025-12-30",
      created_at: "2025-12-25",
      is_overdue: false
    },
    {
      id: "103",
      request_number: "REQ-2025-0903",
      subject: "Conveyor Belt Alignment (Urgent)",
      equipment_name: "Packaging Line 2",
      requester_name: "Sarah Jenkins",
      technician_name: null, // UNASSIGNED EMERGENCY
      technician_id: null,
      stage_name: "New",
      priority: "high",
      scheduled_date: "2025-12-24", // OVERDUE
      created_at: "2025-12-22",
      is_overdue: true
    },
    {
      id: "104",
      request_number: "REQ-2025-0904",
      subject: "Safety Sensor Calibration",
      equipment_name: "Robotic Arm Kuka-09",
      requester_name: "David Vane",
      technician_name: "Emily Davis",
      technician_id: "tech_01",
      stage_name: "In Progress",
      priority: "medium",
      scheduled_date: "2025-12-28",
      created_at: "2025-12-27",
      is_overdue: false
    },
    {
      id: "105",
      request_number: "REQ-2025-0905",
      subject: "HVAC Filter Replacement",
      equipment_name: "Building A Air Handler",
      requester_name: "Alice Wong",
      technician_name: "Mark Tuan",
      technician_id: "tech_05",
      stage_name: "In Progress",
      priority: "low",
      scheduled_date: "2025-12-20", // OVERDUE
      created_at: "2025-12-15",
      is_overdue: true
    },
    {
      id: "106",
      request_number: "REQ-2025-0906",
      subject: "Cooling Fan Motor Noise",
      equipment_name: "Server Rack Chiller 01",
      requester_name: "IT Dept",
      technician_name: "Robert Kim",
      technician_id: "tech_02",
      stage_name: "New",
      priority: "medium",
      scheduled_date: "2026-01-05",
      created_at: "2025-12-26",
      is_overdue: false
    },
    {
      id: "107",
      request_number: "REQ-2025-0907",
      subject: "Total Power Failure - Zone 4",
      equipment_name: "Distribution Panel P-12",
      requester_name: "Gary Oldman",
      technician_name: "Chris Evans",
      technician_id: "tech_08",
      stage_name: "In Progress",
      priority: "high",
      scheduled_date: "2025-12-25", // OVERDUE
      created_at: "2025-12-24",
      is_overdue: true
    },
    {
      id: "108",
      request_number: "REQ-2025-0908",
      subject: "Forklift Battery Replacement",
      equipment_name: "Toyota Lift Truck",
      requester_name: "Logistics Team",
      technician_name: null, 
      technician_id: null,
      stage_name: "New",
      priority: "low",
      scheduled_date: "2026-01-10",
      created_at: "2025-12-27",
      is_overdue: false
    },
    {
      id: "109",
      request_number: "REQ-2025-0909",
      subject: "Air Compressor Oil Change",
      equipment_name: "Atlas Copco GA-30",
      requester_name: "System",
      technician_name: "Mark Tuan",
      technician_id: "tech_05",
      stage_name: "Completed",
      priority: "medium",
      scheduled_date: "2025-12-22",
      created_at: "2025-12-20",
      is_overdue: false // Completed tasks are never overdue
    },
    {
      id: "110",
      request_number: "REQ-2025-0910",
      subject: "Welding Robot Joint Lubrication",
      equipment_name: "Fanuc ArcMate 100i",
      requester_name: "System",
      technician_name: "Emily Davis",
      technician_id: "tech_01",
      stage_name: "New",
      priority: "medium",
      scheduled_date: "2025-12-23", // OVERDUE
      created_at: "2025-12-19",
      is_overdue: true
    },
    {
      id: "111",
      request_number: "REQ-2025-0911",
      subject: "Emergency Lighting Inspection",
      equipment_name: "Facility Safety System",
      requester_name: "EHS Officer",
      technician_name: "Chris Evans",
      technician_id: "tech_08",
      stage_name: "In Progress",
      priority: "high",
      scheduled_date: "2025-12-31",
      created_at: "2025-12-26",
      is_overdue: false
    },
    {
      id: "112",
      request_number: "REQ-2025-0912",
      subject: "CNC Spindle Thermal Overload",
      equipment_name: "Mori Seiki NL-2500",
      requester_name: "Production Manager",
      technician_name: "Emily Davis",
      technician_id: "tech_01",
      stage_name: "In Progress",
      priority: "high",
      scheduled_date: "2025-12-21", // OVERDUE
      created_at: "2025-12-18",
      is_overdue: true
    }
  ]);

  const handleNotify = (req) => {
    if (!req.technician_name) {
      alert(`⚠️ Action Required: Assign a technician to ${req.request_number} before notifying.`);
    } else {
      alert(`🔔 Notification Ping: Tech ${req.technician_name} has been alerted to prioritize ${req.request_number}.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Statistics Header */}
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <ShieldAlert size={24} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Manager Command</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Real-time oversight for {requests.length} maintenance tickets</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Overdue</p>
              <p className="text-2xl font-black text-slate-900">{requests.filter(r => r.is_overdue).length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Assigned</p>
              <p className="text-2xl font-black text-slate-900">{requests.filter(r => r.technician_name).length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Healthy</p>
              <p className="text-2xl font-black text-slate-900">{requests.filter(r => !r.is_overdue && r.technician_name).length}</p>
            </div>
          </div>
        </header>

        {/* Maintenance Request Feed */}
        <div className="grid gap-6">
          {requests.map((req) => (
            <div 
              key={req.id} 
              className={`bg-white rounded-3xl border-2 transition-all group ${
                req.is_overdue ? 'border-red-500 shadow-xl shadow-red-50/50' : 'border-transparent hover:border-slate-200 shadow-sm'
              }`}
            >
              {/* Overdue Badge */}
              {req.is_overdue && (
                <div className="bg-red-500 text-white text-[9px] font-black uppercase py-1.5 text-center tracking-[0.3em]">
                   Critical: Target Date Exceeded
                </div>
              )}

              <div className="p-8 flex flex-col xl:flex-row justify-between items-center gap-8">
                
                {/* Section 1: Core Details */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {req.request_number}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      Opened {req.created_at}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{req.subject}</h2>
                  <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <Settings size={18} className="text-slate-300" />
                    <span className="text-sm">{req.equipment_name}</span>
                  </div>
                </div>

                {/* Section 2: Technician & Action */}
                <div className="flex flex-wrap items-center gap-10 w-full xl:w-auto border-t xl:border-t-0 pt-6 xl:pt-0">
                  
                  {/* Personnel Info */}
                  <div className="min-w-[140px]">
                    <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Lead Technician</p>
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-2xl flex items-center justify-center text-white font-bold ${req.technician_name ? 'bg-slate-900' : 'bg-red-100 text-red-500 animate-pulse'}`}>
                        {req.technician_name ? <User size={20}/> : <AlertTriangle size={20}/>}
                      </div>
                      <div>
                        <p className={`text-sm font-black ${req.technician_name ? 'text-slate-800' : 'text-red-600 italic'}`}>
                          {req.technician_name || 'NEEDS ASSIGNMENT'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{req.stage_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification Trigger */}
                  <button 
                    onClick={() => handleNotify(req)}
                    className={`h-14 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                      req.is_overdue 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-1 active:scale-95' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <BellRing size={18} />
                    Notify Tech
                  </button>
                  
                  <ChevronRight size={24} className="text-slate-200 hidden xl:block" />
                </div>
              </div>

              {/* Enhanced Meta Footer */}
              <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-6">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Priority Level</span>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      req.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Reporter</span>
                    <span className="text-xs font-bold text-slate-700">{req.requester_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${req.is_overdue ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Target Completion</p>
                    <p className={`text-sm font-black tracking-tight ${req.is_overdue ? 'text-red-600' : 'text-slate-700'}`}>
                      {req.scheduled_date}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;