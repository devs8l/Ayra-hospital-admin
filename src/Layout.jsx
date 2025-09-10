import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChangePassword from './components/ChangePassword';
import { changePassword } from './Services/auth';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    // Check if we need to show change password modal
    const shouldShowChangePassword = localStorage.getItem('showChangePassword') === 'true';
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated && shouldShowChangePassword) {
      const timer = setTimeout(() => {
        setShowChangePassword(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);
  const handleChangePassword = async (passwordData) => {
    try {
      await changePassword(passwordData);
      // Success handling
    } catch (error) {
      throw error; // This will be caught in the ChangePassword component
    }
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
    localStorage.removeItem('showChangePassword');
  };

  return (
    <div className="h-full w-full flex flex-col rounded-2xl overflow-hidden justify-center">
      {/* <Navbar /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main
          className={`flex-1 bg-white p-2 overflow-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0' : 'ml-0'
            }`}
          style={{
            marginLeft: sidebarOpen ? '0px' : '0px' // Let sidebar handle its own width
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePassword
        isVisible={showChangePassword}
        onClose={handleCloseChangePassword}
        onConfirm={handleChangePassword}
        onSuccess={() => {
          console.log('Password changed successfully');
        }}
      />
    </div>
  );
};

export default Layout;