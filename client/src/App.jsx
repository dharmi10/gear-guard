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

// Role-Based Pages 
import RequesterDashboard from './pages/RequesterDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyProfile from './pages/MyProfile'; 

// Layout handles conditional Navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();
  
  /**
   * We hide the default technician Navbar on these paths.
   * This ensures the UserNavbar inside RequesterDashboard and MyProfile 
   * is the only one visible.
   */
  const hideNavbarPaths = [
    '/login', 
    '/register', 
    '/signup', 
    '/', 
    '/requester-dashboard', 
    '/profile'
  ];
  
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {/* Technician Navbar - only shows on tech/manager/admin routes */}
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
            <Route path="/dashboard" element={<Dashboard />} /> {/* Technician Hub */}
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            {/* 3. User Profile Route */}
            <Route path="/profile" element={<MyProfile />} />

            {/* 4. Application Tools (Technician Side) */}
            <Route path="/equipment" element={<EquipmentList />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<MaintenanceCalendar />} />
            
            {/* 5. Auth Routes */}
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