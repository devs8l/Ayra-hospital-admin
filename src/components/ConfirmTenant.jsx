import { useState } from 'react';

export default function ConfirmTenant({ 
  isVisible, 
  onClose, 
  onConfirm, 
  userData = {},
  onSuccess
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isVisible) return null;

  const {
    display_name = '',
    email = ''
  } = userData;

  const handleConfirm = async () => {
    setIsCreating(true);
    try {
      await onConfirm();
      setIsSuccess(true);
      // Call onSuccess callback to reset form data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating tenant:', error);
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsCreating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-[#0000003a] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="py-4 mx-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isSuccess ? 'Tenant Created!' : 'Confirm Tenant?'}
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
              <p className="text-gray-600">Tenant has been created successfully!</p>
            </div>
          ) : (
            <>
              
              
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Admin Name
                </label>
                <p className="text-sm text-gray-900 font-medium">
                  {display_name || 'Mr. John Deer'}
                </p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Admin Email ID
                </label>
                <p className="text-sm text-gray-900 font-medium">
                  {email || 'cto@vitalcaresolutions.inc'}
                </p>
              </div>
              
              {/* Info Message */}
              <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-gray-200">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/i.svg" alt="" />
                </div>
                <span className="text-xs text-gray-600">
                  Secure invitation link will be sent to their email (expires in 48 hours)
                </span>
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
                disabled={isCreating}
                className="px-6 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isCreating}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <div className='cursor-pointer flex items-center space-x-2'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create Tenant</span>
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