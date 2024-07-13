

import React, { createContext, useState, useEffect, useContext } from "react";
import { formatJWTTokenToUser } from "../utiles/formatToken";
import { useNavigate } from 'react-router-dom';
import api from "@/services/api.service";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedInUser(null);
        navigate("/");
        console.log("Logged out");
    };

    useEffect(() => {
        const useAxiosInterceptor = () => {
            api.interceptors.response.use(
                (response) => response,
                (error) => {
                    if (error.response && error.response.status === 401) {
                        if (error.config.url === '/auth/login') {
                            return;
                        }
                        logOut();
                        navigate('/');
                    } else if (error.response) {
                        console.error("Error response:", error.response);
                    } else if (error.request) {
                        console.error("Error request:", error.request);
                    } else {
                        console.log(error.message);
                    }
                    return Promise.reject(error);
                }
            );
        };

        useAxiosInterceptor();

        if (token) {
            const { userId } = formatJWTTokenToUser(token)
            async function fetchUser() {
                try {
                    const response = await api.get(`/auth/${userId}`);
                    console.log(response.data.user);
                    setLoggedInUser(response.data.user);
                } catch (error) {
                    console.error(error);
                    setLoggedInUser(null);
                } finally {
                    setLoading(false);
                }
            }
            fetchUser();
        } else {
            setLoading(false);
        }

    }, [token]);

    return (
        <AuthContext.Provider value={{ loggedInUser, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
