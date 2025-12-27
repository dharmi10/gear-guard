import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const ScheduleCheckupModal = ({ isOpen, onClose, refreshCalendar }) => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    equipment_id: '',
    scheduled_date: '',
    type: 'Preventive', // Requirement: Planned maintenance [cite: 29]
    team_name: '', // Auto-filled from equipment record [cite: 41]
  });

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:5000/api/equipment') // Use your equipment endpoint
        .then(res => setEquipmentList(res.data))
        .catch(err => console.error("Error fetching equipment", err));
    }
  }, [isOpen]);

  const handleEquipmentChange = (e) => {
    const id = e.target.value;
    const selected = equipmentList.find(item => item.id === parseInt(id));
    setFormData({
      ...formData,
      equipment_id: id,
      team_name: selected ? selected.maintenance_team : '' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dashboard/requests', formData);
      toast.success("Routine checkup scheduled!");
      refreshCalendar();
      onClose();
    } catch (err) {
      toast.error("Failed to schedule.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="text-purple-600"/> Schedule Preventive</h3>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required className="w-full border p-2 rounded" placeholder="Subject (e.g., Leaking Oil)" 
            onChange={e => setFormData({...formData, subject: e.target.value})} />
          <select required className="w-full border p-2 rounded" onChange={handleEquipmentChange}>
            <option value="">Select Equipment...</option>
            {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
          </select>
          <input type="date" required className="w-full border p-2 rounded" 
            onChange={e => setFormData({...formData, scheduled_date: e.target.value})} />
          <input readOnly className="w-full border p-2 rounded bg-gray-100" value={formData.team_name} placeholder="Auto-assigned Team" />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-xl font-bold">Confirm Schedule</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCheckupModal;