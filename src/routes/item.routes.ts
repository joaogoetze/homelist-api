import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const itemRoutes = Router();

const itemController = new ItemController();

itemRoutes.post("/", authMiddleware, itemController.createItem);
itemRoutes.put("/", authMiddleware, itemController.updateCheckItem);
itemRoutes.put("/name", authMiddleware, itemController.updateNameItem);
itemRoutes.delete("/", authMiddleware, itemController.deleteItem);