import React from 'react'

const AdminUsers = () => {
  return (
    <div className='bg-white  p-6'>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Users</h1>
      <div className="space-y-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            Admin User {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;