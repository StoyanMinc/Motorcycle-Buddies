import { get, put } from "./requester";
const BASE_URL = 'http://localhost:3000/auth';

export const getUseFromServer = (userId) => get(`${BASE_URL}/${userId}`);

export const changePassword = (userData) => put(`${BASE_URL}/change-password`, userData);

export const changeProfileImage = (userData) => put(`${BASE_URL}/change-image`, userData);

