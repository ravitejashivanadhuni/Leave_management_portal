import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

useEffect(() => {

    if (token) {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }

}, [token]);

function login(token, user) {

    localStorage.setItem("token", token);

    localStorage.setItem("role", user.role);

    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);

    setUser(user);

}

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("user");

    setUser(null);

    setToken(null);

}

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}