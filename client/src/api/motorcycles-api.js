import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:3000/motorcycles';

const create = (values) => post(BASE_URL, values);

const getAll = () => get(BASE_URL);

const getOne = (motorcycleId) => get(`${BASE_URL}/${motorcycleId}`);

const getLast = () => get(BASE_URL + '/lasts');
export const motorcyclesService = {
    create,
    getAll,
    getOne,
    getLast
};
