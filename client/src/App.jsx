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

// Role-Based Pages (Ensure these files exist in src/pages)
import RequesterDashboard from './pages/RequesterDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Layout handles conditional Navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Navbar on Login, Register, and Signup pages
  const hideNavbarPaths = ['/login', '/register', '/signup', '/'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
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
            {/* Start on Login */}
            <Route path="/" element={<Login />} />
            
            {/* Role-Based Navigation Targets */}
            <Route path="/requester-dashboard" element={<RequesterDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Technician */}
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            {/* Application Tools */}
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<MaintenanceCalendar />} />
            
            {/* 2. ADD the Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/signup" element={<Signup />} />
            
            {/* Redirect any typos back to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;