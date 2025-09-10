import { useState } from 'react';
import { userSignup } from '../Services/auth';
import ConfirmTenant from '../components/ConfirmTenant';
import { useUser } from '../context/UserContext';

export default function CreateUser() {
    const [currentStep, setCurrentStep] = useState(1);
    const { user } = useUser();
    const [tenantId, setTenantId] = useState(() => {
        return localStorage.getItem('tenantId') || null;
    });
    const [formData, setFormData] = useState({
        user_type: 'admin',
        display_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        tenantId: user?.tenant_id || tenantId
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.display_name) newErrors.display_name = 'Display name is required';
        if (!formData.user_type) newErrors.user_type = 'User type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation - at least 8 characters with letters and numbers
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain both letters and numbers';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1() && currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCreateUser = async () => {
        // Validate step 2 before submitting
        if (!validateStep2()) {
            return Promise.reject(new Error('Please fix the validation errors'));
        }

        try {
            // Prepare the data for API call (remove confirmPassword as it's not needed in the request)
            const { confirmPassword, ...userData } = formData;
            const response = await userSignup(userData);
            console.log('User created successfully:', response);

            if (response.success) {
                // Success - the ConfirmUser component will handle the UI update
                return Promise.resolve();
            } else {
                // Error case - throw an error to be caught by the ConfirmUser component
                throw new Error(response.message || 'Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Re-throw the error to be caught by the ConfirmUser component
            throw error;
        }
    };

    const handleSuccess = () => {
        // Reset form data
        setFormData({
            user_type: 'admin',
            display_name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        // Clear errors
        setErrors({});
        setCurrentStep(1);
    };

    const isStep1Valid = formData.display_name && formData.user_type;
    const isStep2Valid = formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword &&
        formData.password.length >= 8 &&
        /(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    return (
        <div className="h-full bg-white border rounded-2xl overflow-hidden border-gray-200 flex flex-col">
            {/* Header with Step Indicator */}
            <div className="bg-white ">
                <div className="max-w-md px-11 pt-8 pb-5">
                    {/* Step progress bars */}
                    <div className="flex mb-6">
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={i + 1}
                                className={`h-1 flex-1 mx-1 rounded-full ${i + 1 <= currentStep ? 'bg-[#80B5FF]' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex items-start justify-start px-12 ">
                <div className="bg-white rounded-lg w-full max-w-3xl ">
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">User Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.display_name}
                                        onChange={(e) => handleInputChange('display_name', e.target.value)}
                                        placeholder="Enter display name"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.display_name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.display_name && (
                                        <p className="mt-1 text-xs text-red-500">{errors.display_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        User Type
                                    </label>
                                    <select
                                        value={formData.user_type}
                                        onChange={(e) => handleInputChange('user_type', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.user_type ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                    {errors.user_type && (
                                        <p className="mt-1 text-xs text-red-500">{errors.user_type}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Login Information</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Enter email address"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            placeholder="Enter password"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                                        )}
                                        <p className="mt-1 ml-2 text-xs text-gray-500">
                                            Must be at least 8 characters with letters and numbers
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            placeholder="Confirm password"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Bottom Navigation */}
            <div className="bg-white border-t border-gray-200">
                <div className="w-full px-6 py-4">
                    <div className="flex gap-6 justify-end">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-15 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Back
                        </button>
                        {currentStep === 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!isStep1Valid}
                                className="px-15 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                disabled={!isStep2Valid}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Create User</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmTenant
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleCreateUser}
                onSuccess={handleSuccess}
                userData={formData}
            />
        </div>
    );
}