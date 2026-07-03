import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    useEffect(() => {

        if (token) {

            const role = localStorage.getItem("role");

            setUser({
                role
            });

        }

    }, [token]);

    function login(accessToken, role) {

        localStorage.setItem("token", accessToken);

        localStorage.setItem("role", role);

        setToken(accessToken);

        setUser({
            role
        });

    }

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

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