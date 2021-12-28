import React from 'react';
import useLocalStorage from './useLocal';
import config from '../../assets/utils/config';

const AuthContext = React.createContext();

export function useAuth() {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be called within a AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage(config.key.user);
    const [token, setToken] = useLocalStorage(config.key.token);

    const set = async (data) => {
        setToken(data?.jwt);
        setUser(data);
    }

    const unset = async () => {
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ set, unset, token, user }}>
            {children}
        </AuthContext.Provider>
    )
}