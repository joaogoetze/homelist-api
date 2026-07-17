import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const itemRoutes = Router();

const itemController = new ItemController();

// itemRoutes.post("/", authMiddleware, itemController.createItem);
// itemRoutes.put("/:itemId/check", authMiddleware, itemController.updateItemCheck);
// itemRoutes.put("/:itemId/name", authMiddleware, itemController.updateItemName);
// itemRoutes.delete("/:itemId", authMiddleware, itemController.deleteItem);

//itemRoutes.get("/sync/pull/:userId/:date", authMiddleware, listController.syncPull);
itemRoutes.get("/sync/pull/:userId/:date", authMiddleware, itemController.syncPull);
itemRoutes.put("/sync/push", authMiddleware, itemController.syncPush);