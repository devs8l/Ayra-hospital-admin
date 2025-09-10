import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Users, Building2, FileText, UserPlus, ChevronLeft, Menu } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      // Auto-close sidebar on mobile when route changes
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile, setSidebarOpen]);

  const menuItems = [
    { icon: Building2, label: 'User Management', path: '/tenant-management' },
    { icon: Users, label: 'Admin Users', path: '/admin-users' },
    { icon: FileText, label: 'Create User', path: '/user-signup' },
    { icon: UserPlus, label: 'Audit Logs', path: '/audit-logs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Mobile overlay when sidebar is open
  if (isMobile && sidebarOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg">
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-xs transition-all duration-200 ${isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar with smooth transitions
  return (
    <aside
      className={`bg-white  h-screen sticky top-0 transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-19'
        }`}
    >
      <div className={`p-4 flex flex-col items-start h-full`}>
        <div className=''>
          {sidebarOpen ?
            (<div className="flex items-center ml-2 w-19">
              <img src="/Ayra.svg" alt="Ayra Logo" className="w-full h-full" />
            </div>) :
            (<div className="flex items-center ml-2 w-6">
              <img src="/star.svg" alt="Ayra Logo" className="w-full h-full" />
            </div>)}
        </div>

        <div className="flex justify-between items-center mt-7 mb-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 mt-[3px] ${sidebarOpen ? 'ml-1' : 'ml-1'} transition-all items-center duration-200 rounded-md cursor-pointer hover:bg-gray-100`}
          >
            <img
              src="/sidebar.svg"
              alt=""
              className={`transform transition-transform duration-300 ${!sidebarOpen ? 'scale-x-[-1]' : ''}`}
            />
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-all duration-400 ease-in ${isActive && sidebarOpen
                  ? 'bg-blue-50 '
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                {!sidebarOpen ? <Icon size={sidebarOpen ? 20 : 20} className="flex-shrink-0" /> : null}

                {sidebarOpen && (
                  <div className='flex items-center gap-3'>
                    <Icon size={sidebarOpen ? 20 : 20} className="flex-shrink-0" />
                    <span className="text-xs transition-opacity duration-200 delay-100 whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside >
  );
};

export default Sidebar;