import { Router } from 'express';
import { ListController } from '../controllers/list.controller';
import { ItemController } from '../controllers/item.controller';

export const listRoutes = Router();

const listController = new ListController();
const itemController = new ItemController();

listRoutes.get("/", listController.list);
listRoutes.get("/:listId/items", itemController.getItemsByListId)