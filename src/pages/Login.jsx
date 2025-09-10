import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userLogin } from '../Services/auth';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tenantId, setTenantId] = useState('');

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTenantId(idFromUrl);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const loginData = {
        ...credentials,
        tenantId: tenantId
      };
      const res = await userLogin(loginData);
      if (res.success) {
        localStorage.setItem('tenantId', tenantId);
        if (onLogin) onLogin();
        navigate('/');
      } else {
        setError(res.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full  relative flex-col gap-3">


      {/* Form container - centered with 70% viewport height */}
      <div className="relative z-10 w-full max-w-lg mx-auto my-auto bg-[#FFFFFFF0] rounded-xl p-8 min-h-[70vh] flex flex-col">
        {/* Logo container */}
        <div className="flex flex-col justify-center items-center">
          <img
            src="/Ayra.svg"
            alt="Ayra Logo"
            className="w-40"
          />
          {/* Version info */}
          <div className="text-center text-[10px] text-gray-500 mb-8">
            v1.10 | 2025
          </div>
        </div>

        {/* Login Form - centered vertically */}
        <div className="flex-grow flex flex-col justify-center px-10">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="text-xs text-gray-500 mb-3">Enter Email ID</div>
              <input
                type="email"
                name="email"
                placeholder="Enter Email ID"
                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-3">Password</div>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-md hover:bg-blue-700 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : 'Login'}
            </button>


          </form>
        </div>
      </div>

      {/* Footer outside the white box */}
      <div className="text-center text-xs text-gray-300 pb-4">
        ©2025. Ayra is a product of Inquantic Technologies Pvt. Ltd. All Rights Reserved
      </div>
    </div>
  );
};

export default Login;