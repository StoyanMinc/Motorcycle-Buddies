import User from '../models/User.js';
import { compare, } from 'bcrypt';
import { generateToken } from '../utils/tokenUtil.js';

const register = async (formData) => {
    const { username, password } = formData;
    
    const existingUser = await User.findOne({username});
    if(existingUser) {
        throw new Error("Username already exist!");
    }
    
    const result = await User.create({ username, password });
    
    const token = await generateToken(result);

    const userData = {
        username: result.username,
        _id: result._id,
        accessToken:token
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
        accessToken:token
    }
    return userData;
};

export const userService = {
    register,
    login
};

