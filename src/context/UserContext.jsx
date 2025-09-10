import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../Services/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const checkAuthUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response.success) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
        } finally {
            setIsLoading(false); // Always set loading to false when done
        }
    };

    useEffect(() => {
        checkAuthUser();
    }, []);

    const value = {
        user,
        login,
        logout,
        isLoading // Expose loading state
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};