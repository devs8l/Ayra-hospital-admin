import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white  px-6 py-4 flex justify-between items-center">
      <div className="flex items-center w-20">
        <img src="/Ayra.svg" alt="Ayra Logo" className="w-full h-full" />
      </div>
      <button onClick={() => navigate('/tenant-signup')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
        <span>+</span>
        <span>Create User</span>
      </button>
    </nav>
  );
};

export default Navbar;