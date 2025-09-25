
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = "text-gray-600 hover:text-blue-600 transition duration-300";
  const activeLinkClass = "text-blue-600 font-semibold";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 8c-2.03 0-3.82.91-5.07 2.37-.54.63-.97 1.33-1.3 2.06-.33-.73-.76-1.43-1.3-2.06C9.9 8.91 8.11 8 6.08 8 3.84 8 2 9.84 2 12.08c0 2.24 1.84 4.08 4.08 4.08.93 0 1.79-.33 2.5-.88.29.58.62 1.13 1.02 1.62.4.49.85.92 1.34 1.28.49.36.98.66 1.48.88.5.22 1.01.34 1.52.34s1.02-.12 1.52-.34c.5-.22.99-.52 1.48-.88.49-.36.94-.79 1.34-1.28.4-.49.73-1.04 1.02-1.62.71.55 1.57.88 2.5.88 2.24 0 4.08-1.84 4.08-4.08S21.16 8 18.92 8zM6.08 14.16c-1.15 0-2.08-.93-2.08-2.08S4.93 10 6.08 10s2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm12.84 0c-1.15 0-2.08-.93-2.08-2.08S17.77 10 18.92 10s2.08.93 2.08 2.08-.93 2.08-2.08 2.08z"/>
          </svg>
          <span className="text-2xl font-bold text-gray-800">CityTransit Live</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Home</NavLink>
          <NavLink to="/tracking" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Tracking</NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Schedule</NavLink>
          <NavLink to="/booking" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Booking</NavLink>
          <NavLink to="/chatbot" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Chatbot</NavLink>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login through Aadhaar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
