import { del, get, post, put } from "./requester.js";

const BASE_URL = 'http://localhost:3000/motorcycles';

const create = (values) => post(BASE_URL, values);

const getAll = () => get(BASE_URL);

const getSearched = (searchParams) => get(`${BASE_URL}/search?${searchParams}`);

const getOne = (motorcycleId) => get(`${BASE_URL}/${motorcycleId}`);

const getLast = () => get(BASE_URL + '/lasts');

const sendLike = (motorcycleId, queryParams) => get(`${BASE_URL}/${motorcycleId}/send-like?${queryParams}`);

const editMotorcycle = (motorcycleId, values) => put(`${BASE_URL}/${motorcycleId}/edit`, values);

const deleteMotorcycle = (motorcycleId) => del(`${BASE_URL}/${motorcycleId}/delete`);

export const motorcyclesService = {
    create,
    getAll,
    getOne,
    getLast,
    sendLike,
    editMotorcycle,
    deleteMotorcycle,
    getSearched
};
