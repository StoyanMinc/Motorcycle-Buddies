import { Schema, model } from "mongoose";
import { hash } from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function () {
    this.password = await hash(this.password, 12);
});

const User = model('User', userSchema);

export default User;

