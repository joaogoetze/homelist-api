import { Request, Response } from 'express';
import { ListService } from '../services/list.service';
import { AuthRequest } from "../middlewares/auth.middleware";

export class ListController {
    private listService = new ListService();

    getListsByOwnerId = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.params.userId);

        if (Number.isNaN(userId)) {
            return res.status(400).json({
                error: "invalid user id"
            });
        }

        try {
            const lists = await this.listService.getListByOwnerId(userId);
            res.status(200).json(lists);
        } catch (error) {
            console.error("Error getting lists: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
        
    }

    createList = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.params.userId);
        const { name } = req.body;

        if (Number.isNaN(userId)) {
            return res.status(400).json({
                error: "invalid user id"
            });
        }

        if (!name) {
            return res.status(400).json({
                error: "name is required"
            })
        }

        try {
            const list = await this.listService.createList(userId, name);
            res.status(200).json(list);
        } catch (error) {
            console.error("Error creating list: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }

    deleteList = async (req: Request, res: Response) => {
        const { listId } = req.body;

        if (!listId || Number.isNaN(listId)) {
            return res.status(400).json({
                error: "list id is required"
            });
        }

        try {
            const list = await this.listService.deleteList(listId);
            return res.status(200).json(list);
        } catch (error) {
            console.error("Error deleting list: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }
}