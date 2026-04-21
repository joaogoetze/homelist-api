import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { AppError } from '../errors/app.error';

export class ItemController {
    private itemService = new ItemService();

    getItemsByListId = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        
        if (Number.isNaN(listId)) {
            console.error('Invalid list id');
            throw new AppError('ID da lista é inválido', 400);
        }
        
        const items = await this.itemService.getItemsByListId(listId);
        res.status(200).json(items);
    }

    createItem = async (req: Request, res: Response) => {
        const { listId, name } = req.body;

        if (!listId || Number.isNaN(listId) || !name) {
            console.error('List id and name are required');
            throw new AppError('ID da lista e nome são obrigatórios', 400);
        }
        
        const item = await this.itemService.createItem(listId, name);
        return res.status(201).json(item);
    }

    updateItemCheck = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);
        const { checked } = req.body;

        if (!itemId || typeof checked !== "boolean") {
            console.error('Item id and checked are required');
            throw new AppError('ID do item e status de verificação são obrigatórios', 400);
        }

        const item = await this.itemService.updateItemCheck(itemId, checked);
        return res.status(200).json(item);
    }

    updateItemName = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);
        const { name } = req.body;

        if (!itemId || !name) {
            console.error('Item id and name are required');
            throw new AppError('ID do item e nome são obrigatórios', 400);
        }

        const item = await this.itemService.updateItemName(itemId, name);
        return res.status(200).json(item);
    }

    deleteItem = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);

        if (!itemId) {
            console.error('Item id is required');
            throw new AppError('ID do item é obrigatório', 400);
        }

        const item = await this.itemService.deleteItem(itemId);
        return res.status(200).json(item);
    }
}