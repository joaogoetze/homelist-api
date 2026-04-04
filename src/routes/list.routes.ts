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
listRoutes.post("/:listId/users", authMiddleware, listController.addListUser);
listRoutes.put("/:listId/name", authMiddleware, listController.updateListName);
listRoutes.delete("/:listId", authMiddleware, listController.deleteList);