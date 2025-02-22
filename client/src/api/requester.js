import { getAccessToken } from "../utils/getAccessToken.js";

async function request(method, url, data) {

    const option = {
        method,
        headers: {}
    };

    if (data) {
        option.headers['Content-Type'] = 'application/json',
            option.body = JSON.stringify(data);
    };

    const accessToken = getAccessToken();
    if (accessToken) {
        option.headers['X-Authorization'] = accessToken;
    };

    try {

        const response = await fetch(url, option);

        if (!response.ok) {
            const error = await response.json();

            if (response.status === 403 && error.message === 'Invalid access token') {
                localStorage.removeItem('user');
            };

            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();

    } catch (error) {
        // TODO Make changes if the BONUS is for error notifications
        // alert(error.message);
        throw error;
    };
};

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url) => request('DELETE', url);