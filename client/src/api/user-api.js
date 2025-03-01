import { get, put } from "./requester";
const BASE_URL = 'http://localhost:3000/auth';

export const getUserFromServer = (userId) => get(`${BASE_URL}/${userId}`);

export const changeUserData = (userId, userData) => put(`${BASE_URL}/${userId}/update-user`, userData);

export const changePassword = (userData) => put(`${BASE_URL}/change-password`, userData);

export const changeProfileImage = (userData) => put(`${BASE_URL}/change-image`, userData);

