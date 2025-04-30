import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);

export default authRouter;