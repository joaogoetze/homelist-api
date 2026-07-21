import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ListService } from '../services/list.service';
import { AppError } from '../errors/app.error';

export class ListController {
    constructor(private listService: ListService) {}

    syncPull = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        const date = new Date(req.params?.date.toString());
        
        if (!userId || !date) {
            console.error('User id or date not provided');
            throw new AppError('Usuário ou data não fornecidas');
        }

        const serverUpdates = await this.listService.syncPull(userId, date);
        
        return res.status(200).json(serverUpdates);      
    }

    syncPush = async (req: Request, res: Response) => {
        const localUpdates = req.body?.unsyncedLists;
        
        if (!localUpdates || !localUpdates.length) {
            console.error('Changes not provided');
            throw new AppError('Mudanças não fornecidas')
        }

        const confirmedChanges = await this.listService.syncPush(localUpdates);
        
        return res.status(200).json(confirmedChanges);
    }

    addListUser = async (req: AuthRequest, res: Response) => {
        const listId = Number(req.params.listId);
        const userId = Number(req.userId);
        const { email } = req.body;

        if (!listId || Number.isNaN(listId) || !email) {
            console.error('List id and email are required');
            throw new AppError('ID da lista e email são obrigatórios', 400);
        }
        
        const list = await this.listService.addListUser(listId, email, userId);
        
        return res.status(201).json(list);
    }
}