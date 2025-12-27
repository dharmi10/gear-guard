import React, { useState, useEffect } from 'react';
import { 
  Settings, LayoutDashboard, Wrench, Users, 
  Calendar, BarChart3, Clock, AlertTriangle, 
  CheckCircle2, Plus, MoreVertical, Search, Bell
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// --- Reusable Sub-Components with Error Guards ---

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
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value ?? 0}</h3>
      <p className="text-xs text-gray-400 mt-2 font-medium">{helperText}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'new': 'bg-blue-50 text-blue-700 border-blue-100',
    'in progress': 'bg-amber-50 text-amber-700 border-amber-100',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'overdue': 'bg-rose-50 text-rose-700 border-rose-100',
  };

  // Guard: Safe lowercase conversion
  const normalizedStatus = (status ?? 'New').toLowerCase();
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[normalizedStatus] || styles['new']}`}>
      {status ?? 'New'}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    'low': 'text-gray-500',
    'medium': 'text-blue-500',
    'high': 'text-orange-500',
    'critical': 'text-red-600 font-bold',
  };

  // Guard: Safe lowercase conversion to fix the "undefined" error
  const safePriority = (priority ?? 'Medium').toLowerCase();

  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${styles[safePriority] || styles['medium']}`} />
      <span className={`text-xs font-medium ${styles[safePriority] || styles['medium']}`}>
        {priority ?? 'Medium'}
      </span>
    </div>
  );
};

// --- Main Admin Dashboard Component ---

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_equipment: 0,
    total_requests: 0,
    open_requests: 0,
    overdue_requests: 0
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      // Fetching from your specific backend endpoints
      const [statsRes, requestsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/dashboard/stats'),
        axios.get('http://localhost:5000/api/requests?limit=6')
      ]);
      
      if (statsRes.data.success) setStats(statsRes.data.data);
      if (requestsRes.data.success) setRequests(requestsRes.data.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh data every 10 seconds to show simulator updates
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center font-medium">Loading Real-time Assets...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
      {/* Sidebar */}
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
            { icon: Users, label: 'Maintenance Teams', path: '/admin/teams' },
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
            <Settings size={16} className="text-gray-400 cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search assets or tickets..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              <Plus size={18} />
              <span>New Request</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin System Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Live data from Maintenance Simulator</p>
          </div>

          {/* Dynamic Stat Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={Wrench} label="Total Assets" value={stats.total_equipment} helperText="Active Equipment" />
            <StatCard icon={Clock} label="Live Requests" value={stats.total_requests} helperText="Simulator logs" />
            <StatCard icon={AlertTriangle} label="Open Tasks" value={stats.open_requests} helperText="Needs attention" colorClass="bg-red-50 text-red-600" />
            <StatCard icon={CheckCircle2} label="Overdue" value={stats.overdue_requests} helperText="Action required" colorClass="bg-rose-50 text-rose-600" />
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 xl:col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900">Recent Simulator Activity</h2>
                  <NavLink to="/admin/requests" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</NavLink>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                        <th className="px-6 py-4">Request & Asset</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            {/* Simulator field mapping: subject OR description */}
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-[250px]">{req.subject || req.description || "Unspecified Issue"}</p>
                            <p className="text-xs text-gray-500">{req.equipment_name || 'Hydraulic Press 5000'}</p>
                          </td>
                          <td className="px-6 py-4"><StatusBadge status={req.stage_name} /></td>
                          <td className="px-6 py-4"><PriorityBadge priority={req.priority} /></td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {req.created_at ? new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {requests.length === 0 && (
                    <div className="p-10 text-center text-gray-400 text-sm">No recent simulated requests found.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
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