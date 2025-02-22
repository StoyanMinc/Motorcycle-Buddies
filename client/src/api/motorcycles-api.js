import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:3030/data/motorcycles';

const create = (values) => post(BASE_URL, values);

const getAll = () => get(BASE_URL);

const getOne = (motorcycleId) => get(`${BASE_URL}/${motorcycleId}`);
export const motorcyclesService = {
    create,
    getAll,
    getOne
};
