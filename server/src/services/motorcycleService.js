import Motorcycle from "../models/Motorcycle.js";

const getAll = () => Motorcycle.find({});

const findOne = (_id) => Motorcycle.findById(_id);

const create = (motorcycleData) => Motorcycle.create(motorcycleData);

const remove = (_id) => Motorcycle.findByIdAndDelete(_id)



export const motorcycleService = {
    getAll,
    create,
    findOne,
    remove
}