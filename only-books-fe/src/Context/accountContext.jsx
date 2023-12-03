/* eslint-disable react-refresh/only-export-components */
// AccountContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const updateUserData = (data) => {
        setUserData(data);
        setIsAuthenticated(true);
        setIsAdmin(data?.rol === 'ADMIN');
    };

    const clearUserData = () => {
        setUserData(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    useEffect(() => {

        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        // console.log('storedUserData: ' + storedUserData);
        if (storedUserData) {
            updateUserData(storedUserData);
        }
    }, []); 

    return (
        <AccountContext.Provider value={{ userData, updateUserData, clearUserData, isAuthenticated, setIsAuthenticated, isAdmin }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    return useContext(AccountContext);
};
