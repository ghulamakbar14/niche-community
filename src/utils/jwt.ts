import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d'; // token expiry

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const generateToken = (userId: string): string => {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};