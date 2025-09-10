import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../Services/auth';
const UserContext = createContext();
const USER_STORAGE_KEY = 'userData'; // Key for localStorage

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const login = (userData) => {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
    };

    const checkAuthUser = async () => {
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsLoading(false);
            } else {
                await getCurrentUser();
            }
        } catch (error) {
            console.error('Error checking auth user:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthUser();
    }, []);

    const value = {
        user,
        login,
        logout,
        isLoading,
        checkAuthUser
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