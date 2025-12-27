import React from 'react';
import { Users, Mail, UserPlus, MoreHorizontal } from 'lucide-react';

const TeamCard = ({ title, description, activeCount, members }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Team Header */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-600">
          <UserPlus size={14} />
          {activeCount} active
        </div>
      </div>

      {/* Team Members List */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Members</span>
          <span className="text-xs font-medium text-slate-400">{members.length} technicians</span>
        </div>
        
        <div className="space-y-3">
          {members.map((member, idx) => (
            <div key={idx} className="group flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                {/* Initial Avatar */}
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white shadow-sm">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Mail size={12} className="text-slate-300" />
                    {member.email}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  member.tasks > 5 
                  ? 'bg-rose-50 text-rose-600 border-rose-100' 
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {member.tasks} tasks
                </div>
                <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MaintenanceTeams = () => {
  // Example data based on your image
  const teamsData = [
    {
      title: "Mechanics",
      description: "Mechanical equipment maintenance and repair",
      activeCount: 3,
      members: [
        { name: "John Martinez", email: "j.martinez@gearguard.com", tasks: 5 },
        { name: "Sarah Chen", email: "s.chen@gearguard.com", tasks: 3 }
      ]
    },
    {
      title: "Electricians",
      description: "Electrical systems and equipment",
      activeCount: 2,
      members: [
        { name: "Mike Johnson", email: "m.johnson@gearguard.com", tasks: 7 },
        { name: "Emily Davis", email: "e.davis@gearguard.com", tasks: 2 }
      ]
    },
    {
      title: "IT Support",
      description: "Computer and network equipment",
      activeCount: 1,
      members: [
        { name: "Alex Thompson", email: "a.thompson@gearguard.com", tasks: 4 },
        { name: "Lisa Wong", email: "l.wong@gearguard.com", tasks: 6 }
      ]
    },
    {
      title: "HVAC Team",
      description: "Heating, ventilation, and air conditioning",
      activeCount: 2,
      members: [
        { name: "Robert Kim", email: "r.kim@gearguard.com", tasks: 8 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Maintenance Teams</h1>
        <p className="text-slate-500 text-sm mt-1">Manage technical departments and personnel workload.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {teamsData.map((team, index) => (
          <TeamCard key={index} {...team} />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTeams;