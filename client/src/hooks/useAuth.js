import { useNavigate } from "react-router-dom";

import { login, logout, register } from "../api/auth-api.js"
import { getUser } from "../context/AuthContext.jsx";
import { useState } from "react";

export function useRegister() {
    const { setUser } = getUser();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const registerHandler = async (values) => {
        setError(null);

        try {
            const userData = await register(values.username, values.password);
            setUser({
                username: userData.username,
                userId: userData._id,
                accessToken: userData.accessToken
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return {registerHandler, error};
};

export function useLogin() {
    const { setUser } = getUser();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const loginHandler = async (values) => {
        setError(null);
        try {
            const userData = await login(values.username, values.password);
            console.log(userData);

            setUser({
                username: userData.username,
                userId: userData._id,
                accessToken: userData.accessToken
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return { loginHandler, error };
};

export function useLogout() {
    const { setUser } = getUser();

    const logoutHandler = async () => {
        await logout();
        setUser(null);
        localStorage.removeItem('user');
    };

    return logoutHandler;
};