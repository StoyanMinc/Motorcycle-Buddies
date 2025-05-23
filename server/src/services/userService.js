import User from '../models/User.js';
import { compare, hash } from 'bcrypt';
import { generateToken } from '../utils/tokenUtil.js';

const register = async (formData) => {
    const { username, password } = formData;

    if(username.length < 4) {
        throw new Error("Username must be at least 4 characters long!");
    }
    if(password.length < 6) {
        throw new Error("Password must be at least 6 characters long!");
    };

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

const changeUserData = async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new: true} );
    return updatedUser;
}

const changeImage = async (userId, image) => {
    const user = await User.findByIdAndUpdate(userId, { image: image }, {new: true});
    return user;
}

const changePassword = async (values) => {
    const { userId, oldPassword, newPassword } = values;
    
    if(newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters!");
    }

    const result = await User.findById(userId);
    const isValid = await compare(oldPassword, result.password);
    if (!isValid) {
        throw new Error("Old password is invalid!");
    }

    const hashedPassword = await hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return ('Password updated successfully!');
};

export const userService = {
    register,
    login,
    getUser,
    changeUserData,
    changePassword,
    changeImage,

};

