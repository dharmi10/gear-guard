import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Component Imports
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/EquipmentList';
import KanbanBoard from './pages/KanbanBoard';
import MaintenanceCalendar from './pages/MaintenanceCalendar';
import Login from './pages/Login';
import Register from './pages/Register';
import Signup from './pages/Signup';
import MyProfile from './pages/MyProfile';
import TechProfile from './pages/TechProfile';
// Role-Based Pages 
import RequesterDashboard from './pages/RequesterDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MaintenanceRequests from './pages/MaintenanceRequests';
import EquipmentManagement from './pages/EquipmentManagement';

import MaintenanceTeams from './pages/MaintenanceTeams';
// Layout handles conditional Navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();
  
  /**
   * We hide the default technician Navbar on these specific paths.
   * NOTE: We do NOT add '/tech-profile' here because we WANT the 
   * technician navbar to stay visible on the tech profile page.
   */
  const hideNavbarPaths = [
    '/login', 
    '/register', 
    '/signup', 
    '/', 
    '/requester-dashboard', 
    '/profile' // This is the user/requester profile
  ];
  
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Technician Navbar - shows on tech dashboard, tech-profile, etc. */}
      {showNavbar && <Navbar />}
      
      <div className={showNavbar ? "container mx-auto px-4 py-6" : ""}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Toaster position="top-center" />
        
        <Layout>
          <Routes>
            {/* 1. Default Landing Page */}
            <Route path="/" element={<Login />} />
            
            {/* 2. Role-Based Navigation Targets */}
            <Route path="/requester-dashboard" element={<RequesterDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<MaintenanceRequests />} />
            <Route path="/admin/equipment" element={<EquipmentManagement />} />
            
            {/* 3. Profiles */}
            <Route path="/profile" element={<MyProfile />} /> {/* Requester Side */}
            <Route path="/tech-profile" element={<TechProfile />} /> {/* Technician Side */}

            {/* 4. Application Tools (Technician Side) */}
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<MaintenanceCalendar />} />
            
            {/* 2. ADD the Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />
          
<Route path="/admin/requests" element={<MaintenanceRequests />} />
<Route path="/admin/equipment" element={<EquipmentManagement />} />
<Route path="/admin/teams" element={<MaintenanceTeams />} /> // 2. ENSURE THIS PATH MATCHES SIDEBAR
        

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* 6. Catch-all: Redirect any errors back to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;