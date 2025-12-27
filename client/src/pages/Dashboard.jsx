import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Safe Badge Component ---
const PriorityBadge = ({ priority }) => {
  // Guard against the "toLowerCase" error we saw earlier
  const safePriority = (priority ?? 'Medium').toLowerCase();
  
  const styles = {
    high: 'text-red-600 font-bold',
    medium: 'text-orange-500',
    low: 'text-blue-500'
  };

  return (
    <span className={`text-xs font-medium ${styles[safePriority] || 'text-gray-500'}`}>
      {priority ?? 'Medium'}
    </span>
  );
};

const TechnicianDashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Use the correct API endpoint that actually exists in server.js
        const response = await axios.get('http://localhost:5000/api/requests');
        
        if (response.data.success) {
          // In a real app, you'd filter by tech ID, but for now, show all simulator data
          setMyTasks(response.data.data);
        }
      } catch (err) {
        console.error("Technician Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading assigned tasks...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assigned Maintenance Tasks</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myTasks.map((task) => (
              <tr key={task.id}>
                <td className="px-4 py-3 font-medium">{task.equipment_name || 'General Asset'}</td>
                <td className="px-4 py-3 text-sm">{task.subject || task.description}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicianDashboard;