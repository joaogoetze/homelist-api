import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

export const itemRoutes = Router();

const itemController = new ItemController();

itemRoutes.get("/", itemController.list);
itemRoutes.post("/", itemController.createItem);