import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ItemService } from '../services/item.service';
import { AppError } from '../errors/app.error';

export class ItemController {
    constructor(private itemService: ItemService) {}

    syncPull = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        const date = new Date(req.params?.date.toString());
    
        if (!userId || !date) {
            console.error('User id or date not provided');
            throw new AppError('Usuário ou data não fornecidas');
        }

        const serverUpdates = await this.itemService.syncPull(userId, date);
        
        return res.status(200).json(serverUpdates);      
    }

    syncPush = async(req: Request, res: Response) => {
        const localUpdates = req.body?.unsyncedItems;

        if (!localUpdates || !localUpdates.length) {
            console.error('Changes not provided');
            throw new AppError('Mudanças não fornecidas')
        }

        const confirmedChanges = await this.itemService.syncPush(localUpdates);
        
        return res.status(200).json(confirmedChanges);
    } 
}