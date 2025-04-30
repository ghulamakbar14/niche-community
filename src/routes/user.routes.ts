import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controller';
const userRouter = Router();

// Route to create a new user (POST /api/users)
userRouter.post('/', createUser);

// Route to get all users (GET /api/users)
userRouter.get('/', getUsers);


export default userRouter; // exports this router so app.ts can use it.
