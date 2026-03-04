import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

export class ItemController {
    private itemService = new ItemService();

    list = async (req: Request, res: Response) => {
        const users = await this.itemService.list();
        res.json(users);
    }

    getItemsByListId = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);

        const items = await this.itemService.getItemsByListId(listId);
        res.json(items);
    }

    createItem = async (req: Request, res: Response) => {
        const { listId, name} = req.body;

        const item = await this.itemService.createItem(
            listId,
            name
        );

        return res.status(201).json(item)
    }
}