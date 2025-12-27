import React, { useState } from 'react';
import { 
  PlusCircle, ClipboardList, X, CheckCircle2, Clock, 
  PlayCircle, PackageCheck, Settings, Factory, Calendar as CalIcon, 
  ChevronRight, ShieldCheck, Activity, MapPin 
} from 'lucide-react';
import UserNavbar from '../components/UserNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const RequesterDashboard = () => {
  // Modal States
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isStatusListOpen, setIsStatusListOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '', machineModel: '', serialNumber: '',
    date: new Date(), location: '', problem: '',
    description: '', category: 'Equipment', warrantyNo: ''
  });

  // Mock data
  const [myRequests] = useState([
    { id: 1, model: 'T-800', serial: 'SN-8829-X', status: 'In Progress', progress: 65, date: 'Oct 24, 2025' },
    { id: 2, model: 'CNC-Router', serial: 'SN-4410-B', status: 'Requested', progress: 10, date: 'Oct 26, 2025' },
    { id: 3, model: 'Hydraulic Press', serial: 'SN-1102-C', status: 'Completed', progress: 100, date: 'Oct 20, 2025' },
    { id: 4, model: 'Lathe Machine', serial: 'SN-9921-Z', status: 'In Progress', progress: 40, date: 'Oct 27, 2025' }
  ]);

  const repairSteps = [
    { label: 'Requested', status: 'complete', icon: <Clock className="w-4 h-4" /> },
    { label: 'Started', status: 'complete', icon: <PlayCircle className="w-4 h-4" /> },
    { label: 'In Progress', status: 'current', icon: <Settings className="w-4 h-4 animate-spin" /> },
    { label: 'Completed', status: 'upcoming', icon: <PackageCheck className="w-4 h-4" /> },
  ];

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-100">
      <UserNavbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>

        {/* Heading Section */}
        <div className="text-center space-y-3 relative z-10 max-w-2xl mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
             <ShieldCheck className="w-5 h-5 text-blue-600" />
             <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[10px]">Secure Asset Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">
            Industrial Control Centre
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
            Initialize maintenance protocols and track repair lifecycles across your industrial fleet.
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10 px-4">
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="group relative flex items-center gap-6 bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-[2rem] shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="bg-white/15 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <PlusCircle className="w-8 h-8" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold uppercase tracking-tight">Create Request</span>
              <span className="text-blue-100 text-xs opacity-70">Initialize Repair Ticket</span>
            </div>
          </button>

          <button 
            onClick={() => setIsStatusListOpen(true)}
            className="group relative flex items-center gap-6 bg-white border border-slate-200 hover:border-blue-600 text-slate-800 p-8 rounded-[2rem] shadow-lg shadow-slate-200 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-blue-50 transition-colors">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold uppercase tracking-tight text-slate-900">View Status</span>
              <span className="text-slate-400 text-xs">Monitor Active Repairs</span>
            </div>
          </button>
        </div>

        {/* Status Indicators Footer */}
        <div className="mt-16 flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Network Active</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> System Encrypted</div>
        </div>
      </div>

      {/* --- MODAL: CREATE REQUEST FORM --- */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Initialization Protocol</h2>
              </div>
              <button onClick={() => setIsRequestModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[80vh] overflow-y-auto text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Company Entity</label>
                <input required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all" placeholder="Enter Company Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Machine Model</label>
                <input required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all" placeholder="e.g. T-1000" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Serial Identification</label>
                <input required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all" placeholder="SN-8829-X" />
              </div>
              
              <div className="space-y-1 relative">
                <label className="text-[10px] font-black uppercase text-slate-400">Scheduled Date</label>
                <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-slate-700 font-semibold text-sm">
                  {formData.date.toLocaleDateString()} <CalIcon className="w-4 h-4 text-blue-600" />
                </button>
                {showCalendar && (
                  <div className="absolute top-full left-0 z-[60] mt-2 bg-white shadow-2xl border rounded-xl p-2 animate-in slide-in-from-top-2">
                    <Calendar onChange={handleDateChange} value={formData.date} />
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Asset Category</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setFormData({...formData, category: 'Equipment'})} className={`flex-1 py-3 rounded-xl border transition-all font-bold text-[10px] uppercase flex items-center justify-center gap-2 ${formData.category === 'Equipment' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-400 bg-white'}`}>
                    <Settings className="w-3 h-3"/> Equipment
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, category: 'Work Centre'})} className={`flex-1 py-3 rounded-xl border transition-all font-bold text-[10px] uppercase flex items-center justify-center gap-2 ${formData.category === 'Work Centre' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-400 bg-white'}`}>
                    <Factory className="w-3 h-3"/> Work Centre
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Warranty Card No.</label>
                <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" placeholder="WC-900" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Facility Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" placeholder="Floor / Zone" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Anomaly Description</label>
                <textarea rows="3" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" placeholder="Describe the problem in detail..."></textarea>
              </div>

              <div className="md:col-span-2 pt-2">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-100">
                  Submit Maintenance Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: STATUS LIST (CARDS) --- */}
      {isStatusListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-[#f8fafc] w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Active Repair Fleet</h2>
              </div>
              <button onClick={() => setIsStatusListOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRequests.map((req) => (
                <div 
                  key={req.id} 
                  onClick={() => setSelectedRequest(req)}
                  className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between group aspect-square"
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{req.status}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-600/10 w-12 h-12 rounded-2xl flex items-center justify-center">
                      <Settings className={`w-6 h-6 text-blue-600 ${req.status === 'In Progress' ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">{req.model}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{req.serial}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Progress</p>
                      <p className="text-sm font-black text-slate-900">{req.progress}%</p>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${req.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: INDIVIDUAL PROGRESS TRACKER --- */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
              <div className="text-left">
                <h2 className="text-lg font-bold uppercase tracking-tighter">{selectedRequest.model}</h2>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Active Analysis</p>
              </div>
              <button onClick={() => setSelectedRequest(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-10 space-y-8">
              {repairSteps.map((step, index) => (
                <div key={index} className="flex gap-6 relative">
                  {index !== repairSteps.length - 1 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-10 ${step.status === 'complete' ? 'bg-blue-600' : 'bg-slate-100'}`} />
                  )}
                  <div className={`z-10 w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
                    step.status === 'complete' ? 'bg-blue-600 text-white' : 
                    step.status === 'current' ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50' : 'bg-slate-50 text-slate-300'
                  }`}>
                    {step.status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold uppercase text-xs tracking-widest ${step.status === 'upcoming' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{selectedRequest.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => setSelectedRequest(null)} className="w-full py-3 bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-100 transition-colors">Return to List</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequesterDashboard;