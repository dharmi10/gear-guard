import React, { useState } from 'react';

const Dashboard = () => {
  // Hardcoded rows as requested
  const [requests] = useState([
    { id: 1, subject: "Leaking Oil", employee: "John Doe", technician: "Mike Mech", stage: "In Progress", category: "CNC Machine", company: "Production Dept" },
    { id: 2, subject: "Monitor Flickering", employee: "Sarah Smith", technician: "Alex IT", stage: "New", category: "Monitor", company: "Finance Dept" },
    { id: 3, subject: "Brakes Squeaking", employee: "Robert Brown", technician: "Mike Mech", stage: "Running", category: "Forklift", company: "Logistics" },
    { id: 4, subject: "System Update", employee: "Emily Davis", technician: "Alex IT", stage: "New", category: "Laptop", company: "Marketing" }
  ]);

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Maintenance Dashboard</h1>
      
      {/* 1. Metric Boxes (Red, Green, Blue) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold">Scrap Assets</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold">Pending & Overdue</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold">Workforce Utilization</h3>
          <p className="text-3xl font-bold">84%</p>
        </div>
      </div>

      {/* 2. Maintenance Requests Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">Recent Maintenance Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                <th className="p-4 border-b">Subject</th>
                <th className="p-4 border-b">Employee Name</th>
                <th className="p-4 border-b">Assigned Tech</th>
                <th className="p-4 border-b">Stage</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Company/Dept</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-blue-50 transition-colors border-b border-gray-100">
                  <td className="p-4 font-medium">{req.subject}</td>
                  <td className="p-4">{req.employee}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                      {req.technician}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      req.stage === 'New' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {req.stage}
                    </span>
                  </td>
                  <td className="p-4">{req.category}</td>
                  <td className="p-4 text-gray-500 italic">{req.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;