import React, { useEffect, useState } from 'react';
import { ChevronDown, Users, Building, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTenants, getTenantUsers } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import ShimmerLoader from '../components/ShimmerLoader';
import { useUser } from '../context/UserContext';

// TenantSidebar Component (unchanged)
const TenantSidebar = ({ isCollapsed, toggleSidebar }) => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { icon: Users, label: 'Tenants', active: true },
    { icon: Building, label: 'Properties', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ];

  return (
    <div className={`bg-[#FFFFFFF0] border-r border-gray-200 h-full flex flex-col overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-15' : 'w-64'}`}>

      <div className={`p-2 ${isCollapsed ? '' : ''} flex justify-between items-center`}>
        <button
          onClick={toggleSidebar}
          className={`p-1 mt-[1px] ml-1 transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-100`}
        >
          <img
            src="/sidebar.svg"
            alt=""
            className={`transform transition-transform duration-300 ${isCollapsed ? 'scale-x-[-1]' : ''}`}
          />
        </button>
      </div>

      {/* Dropdown Section */}
      <div className={`p-4 ${isCollapsed ? '' : 'border-b border-gray-200'} `}>
        {!isCollapsed && (
          <>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-3  rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-xs font-medium text-gray-700">Lorem Ipsum</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedOption('Option 1');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center ${selectedOption === 'Option 1' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${selectedOption === 'Option 1' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      Option 1
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOption('Option 2');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center ${selectedOption === 'Option 2' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${selectedOption === 'Option 2' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      Option 2
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOption('Option 3');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center ${selectedOption === 'Option 3' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${selectedOption === 'Option 3' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      Option 3
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOption('Option 4');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center ${selectedOption === 'Option 4' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${selectedOption === 'Option 4' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      Option 4
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Second Dropdown */}
            <div className="mt-4">
              <div className="p-3  rounded-lg">
                <span className="text-xs font-medium text-gray-700">Lorem Ipsum</span>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-3"></div>
                    <span className="text-xs text-gray-600">Option 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                    <span className="text-xs text-gray-600">Option 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Selector */}
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">Region</label>
              <div className="flex items-center p-2  rounded-lg">
                <span className="text-lg mr-2">🇺🇸</span>
                <span className="text-xs text-gray-700">North America</span>
                <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Menu */}
      {!isCollapsed && (<nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                {!isCollapsed && item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>)}


    </div>
  );
};

// Main Dashboard Component
const TenantDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  // Your actual tenant data
  const [tenantData, setTenantData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      setIsLoading(true);
      try {
        const data = await getTenantUsers(user.tenant_id);
        setTenantData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setIsLoading(false);
      }
    };

    fetchTenants();
  }, []);

  // Format the date to match your previous format (MM/DD/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Transform your data to match the expected structure
  const specialities = ['Cardiologist', 'Neurologist', 'Orthopedic'];
  const transformedTenantData = tenantData.map(tenant => ({
    id: user.tenant_id,
    tenantName: specialities[Math.floor(Math.random() * specialities.length)],
    admin: {
      name: tenant.display_name || 'Unnamed User',
      avatar: '/api/placeholder/32/32'
    },
    activeUsers: Math.floor(Math.random() * 20) + 1,
    tenantStatus: tenant.is_active ? 'Active' : 'Inactive',
    usageQuota: `${Math.floor(Math.random() * 10000).toLocaleString()} / ${Math.floor(Math.random() * 30000 + 5000).toLocaleString()}`,
    dateCreated: formatDate(tenant.created_at),
    lorem: 'Lorem Ipsum'
  }));

  const columns = [
    { key: 'tenantName', label: 'Speciality', width: 'w-60' },
    { key: 'admin', label: 'Username', width: 'w-48' },
    { key: 'activeUsers', label: 'Active Status', width: 'w-32' },
    
    { key: 'usageQuota', label: 'Usage Quota', width: 'w-40' },
    { key: 'dateCreated', label: 'Date Created', width: 'w-32' },
    { key: 'lorem', label: 'Lorem', width: 'w-28' }
  ];

  const renderCellContent = (tenant, columnKey) => {
    switch (columnKey) {
      case 'tenantName':
        return <span className="font-medium text-gray-900">{tenant.tenantName}</span>;

      case 'admin':
        return (
          <div className="flex items-center">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-medium text-white">
                {tenant.admin.name.charAt(0)}
              </span>
            </div>
            <span className="text-gray-700 truncate">{tenant.admin.name}</span>
          </div>
        );

      case 'activeUsers':
        return <span className="text-gray-900">{tenant.activeUsers}</span>;

      case 'tenantStatus':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
            {tenant.tenantStatus}
          </span>
        );

      case 'usageQuota':
        return <span className="text-gray-900">{tenant.usageQuota}</span>;

      case 'dateCreated':
        return <span className="text-gray-700">{tenant.dateCreated}</span>;

      case 'lorem':
        return <span className="text-gray-700">{tenant.lorem}</span>;

      default:
        return null;
    }
  };


  return (
    <div className="h-full border border-gray-200 overflow-hidden bg-white flex flex-col rounded-2xl text-xs">
      <div className='p-2 flex justify-end border-b border-gray-200'>
        <button onClick={() => navigate('/user-signup')} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
          <span>+</span>
          <span>Create User</span>
        </button>
      </div>
      <div className='flex h-full overflow-hidden'>
        {/* Sidebar */}
        <TenantSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white shadow-sm h-full flex flex-col overflow-hidden">
            {/* Single Scrollable Container for Header and Content */}
            <div className="flex-1 overflow-auto">
              <div className="min-w-max">
                {/* Fixed Header */}
                <div className="bg-blue-50 border-b border-gray-200 sticky top-0 z-10">
                  <div className="flex">
                    {columns.map((column, index) => (
                      <div
                        key={column.key}
                        className={`${column.width} px-6 py-4 font-medium text-gray-500 flex-shrink-0 ${index < columns.length - 1 ? 'border-r border-gray-200' : ''
                          }`}
                      >
                        {column.label}
                      </div>
                    ))}
                  </div>
                </div>

                {isLoading ? (
                  <ShimmerLoader />
                ) : (
                  <div>
                    {/* Content Rows */}
                    {transformedTenantData.map((tenant) => (
                      <div
                        key={tenant.id}
                        onClick={() => navigate(`/tenant-management/${tenant.id}`)}
                        className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex">
                          {columns.map((column, index) => (
                            <div
                              key={column.key}
                              className={`${column.width} px-6 py-3 flex-shrink-0 flex items-center ${index < columns.length - 1 ? 'border-r border-gray-200' : ''
                                }`}
                            >
                              {renderCellContent(tenant, column.key)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;