import { Request, Response } from 'express';
import { ListService } from '../services/list.service';

export class ListController {
    private listService = new ListService();

    list = async (req: Request, res: Response) => {
        const lists = await this.listService.list();
        res.json(lists);
    }
}