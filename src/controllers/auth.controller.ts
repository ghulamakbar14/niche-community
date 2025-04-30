import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from "../../generated/prisma";
import { generateToken } from "../utils/jwt";
import { error } from "console";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) : Promise<any> => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({error: 'Email and password are required'});

    const user = await prisma.user.findUnique({where: {email}});
    if(!user)
        return res.status(401).json({error: 'Invalid credentials 1'});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
        return res.status(401).json({error: 'Invalid credentials 2'});

    const token = generateToken(user.id);
    res.json({token, user: {id: user.id, username: user.username, email: user.email}});

};


export const registerUser = async (req: Request, res: Response) : Promise<any> => {
    const {email, password, username} = req.body;

    if(!email || !password || !username)
        return res.status(400).json({error: 'Email, Username and password are required'});

    const user = await prisma.user.findFirst({where: {email}});
    if(user)
        return res.status(401).json({error: 'Email already in use. Please use a different email'});

    const user_name = await prisma.user.findFirst({where: {username}});
    if(user_name)
        return res.status(401).json({error: 'Username already in use. Please use a different username'});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username
        },
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: true // optionally include timestamps
        }
    });
    return res.status(201).json({ message: 'User registered successfully. Please login', user: newUser });
};