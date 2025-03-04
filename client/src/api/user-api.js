import { get, put } from "./requester";
const BASE_URL = 'http://192.168.1.75:3000/auth';

export const getUserFromServer = (userId) => get(`${BASE_URL}/${userId}`);

export const changeUserData = (userId, userData) => put(`${BASE_URL}/${userId}/update-user`, userData);

export const changePassword = (userData) => put(`${BASE_URL}/change-password`, userData);

export const changeProfileImage = (userData) => put(`${BASE_URL}/change-image`, userData);

