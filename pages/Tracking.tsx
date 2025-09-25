
import React, { useState, useEffect, useMemo } from 'react';
import { BUS_ROUTES } from '../constants/data';
import type { BusRoute } from '../types';

const Tracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(BUS_ROUTES[0]);
  const [position, setPosition] = useState({ x: 10, y: 20 });

  const filteredRoutes = useMemo(() =>
    BUS_ROUTES.filter(route =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  useEffect(() => {
    if (!selectedBus) return;

    const interval = setInterval(() => {
      setPosition(prev => ({
        x: (prev.x + Math.random() * 4 - 2 + 90) % 90 + 5,
        y: (prev.y + Math.random() * 4 - 2 + 90) % 90 + 5,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedBus]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[75vh]">
      {/* Sidebar */}
      <aside className="lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Track a Bus</h2>
        <input
          type="text"
          placeholder="Search by route name or ID (e.g., R101)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-y-auto flex-grow">
          <ul className="space-y-2">
            {filteredRoutes.map(route => (
              <li key={route.id}>
                <button
                  onClick={() => setSelectedBus(route)}
                  className={`w-full text-left p-3 rounded-lg transition duration-200 ${selectedBus?.id === route.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <p className="font-semibold">{route.name} ({route.id})</p>
                  <p className="text-sm">{route.start} to {route.end}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Map Area */}
      <main className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Live Map</h2>
        <div className="flex-grow bg-gray-200 rounded-lg relative overflow-hidden">
          <img src="https://picsum.photos/seed/map1/1200/800" alt="City Map" className="w-full h-full object-cover opacity-30"/>
          {selectedBus && (
            <>
              {/* Bus Icon */}
              <div
                className="absolute transition-all duration-1000 ease-linear transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${position.y}%`, left: `${position.x}%` }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl">
                    <BusIcon />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-white rounded-md shadow-md text-xs font-semibold whitespace-nowrap">
                    {selectedBus.id}
                   </div>
                </div>
              </div>
              
              {/* Route Info */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">{selectedBus.name}</h3>
                <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-semibold">On Time</span></p>
                <p className="text-sm text-gray-600">Next Stop: {selectedBus.stops[Math.floor(Math.random() * selectedBus.stops.length)]}</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const BusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2H5a2 2 0 00-2 2v6a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V8zm-6 8H8v-2h4v2zm4-4H4V8h12v4z" clipRule="evenodd" /></svg>;

export default Tracking;
