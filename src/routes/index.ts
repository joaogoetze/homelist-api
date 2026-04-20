import { Router } from 'express';
import { listRoutes } from './list.routes';
import { itemRoutes } from './item.routes';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

export const routes = Router();

routes.use("/lists", listRoutes);
routes.use("/items", itemRoutes);
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);