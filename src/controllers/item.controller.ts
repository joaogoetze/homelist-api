import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { AppError } from '../errors/app.error';

export class ItemController {
    private itemService = new ItemService();

    getItemsByListId = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        
        if (Number.isNaN(listId)) {
            throw new AppError('invalid list id', 400);
        }
        
        const items = await this.itemService.getItemsByListId(listId);
        res.status(200).json(items);
    }

    createItem = async (req: Request, res: Response) => {
        const { listId, name } = req.body;

        if (!listId || Number.isNaN(listId) || !name) {
            throw new AppError('list id and name are required', 400);
        }
        
        const item = await this.itemService.createItem(listId, name);
        return res.status(201).json(item);
    }

    updateItemCheck = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);
        const { checked } = req.body;

        if (!itemId || typeof checked !== "boolean") {
            throw new AppError('item id and checked are required', 400);
        }

        const item = await this.itemService.updateItemCheck(itemId, checked);
        return res.status(200).json(item);
    }

    updateItemName = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);
        const { name } = req.body;

        if (!itemId || !name) {
            throw new AppError('item id and name are required', 400);
        }

        const item = await this.itemService.updateItemName(itemId, name);
        return res.status(200).json(item);
    }

    deleteItem = async (req: Request, res: Response) => {
        const itemId = Number(req.params.itemId);

        if (!itemId) {
            throw new AppError('item id is required', 400);
        }

        const item = await this.itemService.deleteItem(itemId);
        return res.status(200).json(item);
    }
}