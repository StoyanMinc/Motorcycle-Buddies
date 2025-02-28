import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { generateToken } from '../utils/tokenUtil.js';

const register = async (formData) => {
    const { username, password } = formData;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error("Username already exist!");
    }

    const result = await User.create({ username, password });

    const token = await generateToken(result);

    const userData = {
        username: result.username,
        _id: result._id,
        accessToken: token
    }
    return userData;
};

const login = async (formData) => {
    const { username, password } = formData;
    const result = await User.findOne({ username });
    if (!result) {
        throw new Error("Invalid Username or Password!");
    };

    const isValidPassword = await compare(password, result.password);
    if (!isValidPassword) {
        throw new Error("Invalid Username or Password!");
    }

    const token = await generateToken(result);

    const userData = {
        username: result.username,
        _id: result._id,
        accessToken: token
    }
    return userData;
};


const getUser = async (userId) => {
    try {
        const userData = await User.findById(userId);
        return userData;
    } catch (error) {
        console.log(error.message);
    }
};

const changeImage = async (userId, image) => {
    const user = await User.findByIdAndUpdate(userId, { image: image });
    return user;
}

const changePassword = async (values) => {
    const { userId, oldPassword, newPassword } = values;
    const result = await User.findById(userId);
    const isValid = await compare(oldPassword, result.password);
    if (!isValid) {
        throw new Error("Old password is invalid!");
    }

    const hashedPassword = await hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return ('Password updated successfully!');
}

export const userService = {
    register,
    login,
    changePassword,
    getUser,
    changeImage,

};

