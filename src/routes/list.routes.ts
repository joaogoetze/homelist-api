import { Router } from 'express';
import { ListController } from '../controllers/list.controller';
import { ItemController } from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const listRoutes = Router();

const listController = new ListController();
const itemController = new ItemController();

listRoutes.get("/", authMiddleware, listController.getListsByOwnerId);
listRoutes.get("/:listId/items", authMiddleware, itemController.getItemsByListId);
listRoutes.post("/", authMiddleware, listController.createList);
listRoutes.delete("/", authMiddleware, listController.deleteList);