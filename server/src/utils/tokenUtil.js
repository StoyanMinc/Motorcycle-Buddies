import jwt from '../lib/jwt.js';
const secret = 'supersecret';

export const generateToken = async (userData) => {
    const payload = {
        username: userData.username,
        _id: userData._id
    };

    const token = await jwt.assyncSign(payload, secret);

    return token;
};

  export async function verifyToken(token) {
    
    const decodedToken = await jwt.assyncVerify(token, secret);

    if(!decodedToken) {
        throw new Error("Invalid Token");
    }

    return decodedToken;
}