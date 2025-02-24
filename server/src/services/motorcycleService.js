import Motorcycle from "../models/Motorcycle.js";

const getAll = () => Motorcycle.find({});

const getLasts = () => Motorcycle.find().sort({createdAt: -1}).limit(3).populate('owner', 'username');

const getOne = (_id) => Motorcycle.findById(_id).populate('owner', 'username');

const create = (motorcycleData) => Motorcycle.create(motorcycleData);

const remove = (_id) => Motorcycle.findByIdAndDelete(_id)



export const motorcycleService = {
    getAll,
    getLasts,
    create,
    getOne,
    remove
}