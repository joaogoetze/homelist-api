import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/refresh", authController.refresh);