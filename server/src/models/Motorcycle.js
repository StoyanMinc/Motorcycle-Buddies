import { Schema, model, Types } from 'mongoose';

const motorcycleSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    buyYear: {
        type: Number,
        required: true
    },
    soldYear: {
        type: Number,
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Motorcycle = model('Motorcycle', motorcycleSchema);

export default Motorcycle;
