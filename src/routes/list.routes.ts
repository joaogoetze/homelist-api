import { Router } from 'express';
import { ListController } from '../controllers/list.controller';

export const listRoutes = Router();

const listController = new ListController();

listRoutes.get("/lists", listController.list);