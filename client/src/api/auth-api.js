import { post, get, put } from "./requester.js";

const BASE_URL = `${import.meta.env.VITE_APP_SERVER_URL}/auth`;
export const login = (username, password) => post(`${BASE_URL}/login`, { username, password });
export const register = ( username, password) => post(`${BASE_URL}/register`, { username, password });
export const logout = () => get(`${BASE_URL}/logout`);
