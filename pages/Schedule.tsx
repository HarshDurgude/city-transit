
import React, { useState, useMemo } from 'react';
import { BUS_SCHEDULES } from '../constants/data';

const Schedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedules = useMemo(() =>
    BUS_SCHEDULES.filter(schedule =>
      schedule.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.routeId.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Bus Schedules</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by route name or ID (e.g., Downtown Express)"
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Route ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Route Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Departure</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Arrival</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Operating Days</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredSchedules.map((schedule, index) => (
              <tr key={schedule.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                <td className="text-left py-3 px-4">{schedule.routeId}</td>
                <td className="text-left py-3 px-4 font-medium">{schedule.routeName}</td>
                <td className="text-left py-3 px-4">{schedule.departureTime}</td>
                <td className="text-left py-3 px-4">{schedule.arrivalTime}</td>
                <td className="text-left py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {schedule.days.join(', ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {filteredSchedules.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No schedules found for "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
