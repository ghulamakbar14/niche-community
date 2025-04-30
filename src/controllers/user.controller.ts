import { Request, Response } from 'express';
import { createUserService, getUsersService } from '../services/user.service';
import { error } from 'console';


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }  
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({error: err.message});
    }
}
