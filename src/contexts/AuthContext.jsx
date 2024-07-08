import React, { createContext, useState, useEffect } from "react";
import { formatJWTTokenToUser } from "../utiles/formatToken";
import api from "@/services/api.service";
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();


const AuthProvider = ({ children }) => {


    const [loggedInUser, setLoggedInUser] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    function logOut() {
        localStorage.removeItem("token");
        setLoggedInUser(null)
        navigate("/")
        console.log("Logged out");
    }

    useEffect(() => {
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
        <AuthContext.Provider value={{ loggedInUser, logOut, loading }}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };