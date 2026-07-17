import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { ItemService } from '../services/item.service';
import { ItemRepository } from '../repositories/item.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

export const itemRoutes = Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

itemRoutes.get("/sync/pull/:date", authMiddleware, itemController.syncPull);
itemRoutes.put("/sync/push", authMiddleware, itemController.syncPush);