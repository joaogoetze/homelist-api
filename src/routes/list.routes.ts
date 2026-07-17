import { Router } from 'express';
import { ListController } from '../controllers/list.controller';
import { ListService } from '../services/list.service';
import { ListRepository } from '../repositories/list.repository';
import { UserRepository } from '../repositories/user.repository';
import { authMiddleware } from '../middlewares/auth.middleware';

export const listRoutes = Router();

const listRepository = new ListRepository();
const userRepository = new UserRepository();
const listService = new ListService(listRepository, userRepository);
const listController = new ListController(listService);

listRoutes.get("/sync/pull/:date", authMiddleware, listController.syncPull);
listRoutes.put("/sync/push", authMiddleware, listController.syncPush);
listRoutes.post("/:listId/users", authMiddleware, listController.addListUser);