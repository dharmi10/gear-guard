import React from 'react';
import { 
  Settings, LayoutDashboard, Wrench, Users, 
  Calendar, BarChart3, Clock, AlertTriangle, 
  CheckCircle2, Plus, MoreVertical, Search, Bell
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// --- Reusable Sub-Components ---

const StatCard = ({ icon: Icon, label, value, helperText, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${colorClass || 'bg-blue-50 text-blue-600'}`}>
        <Icon size={20} />
      </div>
      <MoreVertical size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      <p className="text-xs text-gray-400 mt-2 font-medium">{helperText}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'New': 'bg-blue-50 text-blue-700 border-blue-100',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-100',
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Overdue': 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles['New']}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    'Low': 'text-gray-500',
    'Medium': 'text-blue-500',
    'High': 'text-orange-500',
    'Critical': 'text-red-600 font-bold',
  };
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${styles[priority]}`} />
      <span className={`text-xs font-medium ${styles[priority]}`}>{priority}</span>
    </div>
  );
};

// --- Main Admin Dashboard Component ---

const AdminDashboard = () => {
  const requests = [
    { id: 1, title: 'CNC Spindle Overheating', equipment: 'Milling-04', tech: 'John Martinez', status: 'In Progress', priority: 'Critical', due: 'Today' },
    { id: 2, title: 'Annual HVAC Inspection', equipment: 'Bldg A Central', tech: 'Emily Davis', status: 'New', priority: 'Medium', due: 'Jan 12' },
    { id: 3, title: 'Conveyor Belt Tension', equipment: 'Line 2 South', tech: 'Sarah Chen', status: 'New', priority: 'High', due: 'Tomorrow' },
    { id: 4, title: 'Hydraulic Leak Fix', equipment: 'Press-09', tech: 'Robert Kim', status: 'Completed', priority: 'High', due: 'Dec 24' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
      {/* Sidebar - Fixed Left */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <span className="text-xl font-bold tracking-tight text-gray-900">GearGuard</span>
        </div>
        
     

<nav className="flex-1 px-4 space-y-1">
  {[
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Wrench, label: 'Maintenance Requests', path: '/admin/requests' },
    { icon: Settings, label: 'Equipment', path: '/admin/equipment' },
    { icon: Users, label: 'Maintenance Teams', path: '/admin/teams' }, // MUST MATCH App.jsx
  ].map((item) => (
    <NavLink 
      key={item.label} 
      to={item.path}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
      `}
    >
      <item.icon size={18} />
      {item.label}
    </NavLink>
  ))}
</nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@gearguard.io</p>
            </div>
            <Settings size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search assets, tickets, or teams..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-200">
              <Plus size={18} />
              <span>New Request</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin System Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Manage global equipment health and technician workload.</p>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={Wrench} label="Total Equipment" value="128" helperText="+3 added this month" />
            <StatCard icon={Clock} label="Open Requests" value="24" helperText="12 high priority" />
            <StatCard icon={AlertTriangle} label="Overdue" value="04" helperText="Requires attention" colorClass="bg-red-50 text-red-600" />
            <StatCard icon={CheckCircle2} label="Efficiency" value="94%" helperText="MTTR: 4.2 hours" colorClass="bg-emerald-50 text-emerald-600" />
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Table Column */}
            <div className="col-span-12 xl:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900">Recent Maintenance Requests</h2>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                        <th className="px-6 py-4">Request & Asset</th>
                        <th className="px-6 py-4">Technician</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-gray-900">{req.title}</p>
                            <p className="text-xs text-gray-500">{req.equipment}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{req.tech}</td>
                          <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                          <td className="px-6 py-4"><PriorityBadge priority={req.priority} /></td>
                          <td className="px-6 py-4 text-sm text-gray-500">{req.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Widgets Column */}
            <div className="col-span-12 xl:col-span-4 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users size={18} className="text-gray-400" />
                  Team Workload
                </h2>
                <div className="space-y-6">
                  {[
                    { name: 'Mechanics', count: 8, load: 75, color: 'bg-blue-500' },
                    { name: 'Electricians', count: 4, load: 40, color: 'bg-amber-500' },
                    { name: 'HVAC Team', count: 3, load: 90, color: 'bg-rose-500' },
                  ].map((team) => (
                    <div key={team.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{team.name}</span>
                        <span className="text-gray-400">{team.count} active</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${team.color}`} style={{ width: `${team.load}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;