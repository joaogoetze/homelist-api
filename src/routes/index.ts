import { Router } from 'express';
import { listRoutes } from './list.routes';
import { itemRoutes } from './item.routes';
import { authRoutes } from './auth.routes';

export const routes = Router();

routes.use("/lists", listRoutes);
routes.use("/items", itemRoutes);
routes.use("/auth", authRoutes);