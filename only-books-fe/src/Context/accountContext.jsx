/* eslint-disable react-refresh/only-export-components */
// AccountContext.js
import { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUserData = (data) => {
        setUserData(data);
    };

    const clearUserData = () => {
        setUserData(null);
    };

    return (
        <AccountContext.Provider value={{ userData, updateUserData, clearUserData }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    return useContext(AccountContext);
};
