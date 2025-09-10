import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function ChangePassword({
  isVisible,
  onClose,
  onConfirm,
  onSuccess
}) {
  const [isChanging, setIsChanging] = useState(false);
  const { user } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [tenantId, setTenantId] = useState(() => {
    return localStorage.getItem('tenantId') || null;
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  if (!isVisible) return null;

  const validatePasswords = () => {
    const newErrors = {};

    if (!passwords.oldPassword.trim()) {
      newErrors.oldPassword = 'Current password is required';
    }

    if (!passwords.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwords.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwords.oldPassword === passwords.newPassword && passwords.oldPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors for the field being edited
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Real-time validation for confirm password
    if (field === 'confirmPassword' && passwords.newPassword && value !== passwords.newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
    } else if (field === 'confirmPassword' && passwords.newPassword && value === passwords.newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleConfirm = async () => {
    if (!validatePasswords()) return;

    setIsChanging(true);
    try {
      // Pass all required data to the changePassword function
      await onConfirm({
        tenantId: tenantId,
        email: user.email,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setIsSuccess(true);
      // Reset form
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setIsChanging(false);
      // Handle server errors
      setErrors({ general: error.message || 'Failed to change password. Please try again.' });
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsChanging(false);
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPasswords({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false
    });
    onClose();
  };

  const renderPasswordField = (field, label, placeholder) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswords[field] ? 'text' : 'password'}
          value={passwords[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          disabled={isChanging}
          className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          disabled={isChanging}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          {showPasswords[field] ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {errors[field] && (
        <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-[#0000003a] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="py-4 mx-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isSuccess ? 'Password Changed!' : 'Change Password'}
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          {isSuccess ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">Your password has been changed successfully!</p>
            </div>
          ) : (
            <>
              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Current Password */}
              {renderPasswordField('oldPassword', 'Current Password', 'Enter your current password')}

              {/* New Password */}
              {renderPasswordField('newPassword', 'New Password', 'Enter your new password')}

              {/* Confirm New Password */}
              {renderPasswordField('confirmPassword', 'Confirm New Password', 'Confirm your new password')}

              {/* Password Requirements */}
              <div className="flex items-start space-x-2 mt-4 pt-4 border-t border-gray-200">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xs text-gray-600">
                  <p>Password must be at least 8 characters long and different from your current password.</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-between space-x-3">
          {!isSuccess ? (
            <>
              <button
                onClick={handleClose}
                disabled={isChanging}
                className="px-6 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isChanging || Object.keys(errors).some(key => errors[key])}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isChanging ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Changing...</span>
                  </>
                ) : (
                  <div className='cursor-pointer flex items-center space-x-2'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Change Password</span>
                  </div>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={handleClose}
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium w-full"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}