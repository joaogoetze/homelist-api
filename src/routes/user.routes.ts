import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/me", authMiddleware, userController.getMyUserInfo);