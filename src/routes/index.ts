import { Router } from 'express';
import { userRoutes } from './user.routes';
import { listRoutes } from './list.routes';
import { itemRoutes } from './item.routes';

export const routes = Router();

routes.use(userRoutes);
routes.use(listRoutes);
routes.use(itemRoutes);