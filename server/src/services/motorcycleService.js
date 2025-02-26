import Motorcycle from "../models/Motorcycle.js";

const getAll = () => Motorcycle.find({});

const getLasts = () => Motorcycle.find().sort({createdAt: -1}).limit(3).populate('owner', 'username');

const getOne = (_id) => Motorcycle.findById(_id).populate('owner', 'username');

const create = (motorcycleData) => Motorcycle.create(motorcycleData);

const remove = (_id) => Motorcycle.findByIdAndDelete(_id)

const sendLike = async (userId, motorcycleId) => {
    const motorcycle = await getOne(motorcycleId);

    if(motorcycle.owner == userId) {
        throw new Error("You can\'n like own motorcycles!");
    }

    if(motorcycle.likes.includes(userId)) {
        throw new Error("You already liked motorcycle!");
    }

    motorcycle.likes.push(userId);

    motorcycle.save();

    return motorcycle;
};


export const motorcycleService = {
    getAll,
    getLasts,
    create,
    getOne,
    remove,
    sendLike,
}