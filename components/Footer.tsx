
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CityTransit Live. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
