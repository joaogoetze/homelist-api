import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

export class ItemController {
    private itemService = new ItemService();

    list = async (req: Request, res: Response) => {
        const users = await this.itemService.list();
        res.json(users);
    }
}