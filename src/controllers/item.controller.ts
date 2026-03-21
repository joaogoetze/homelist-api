import { Request, Response } from 'express';
import { ItemService } from '../services/item.service';

export class ItemController {
    private itemService = new ItemService();

    getItemsByListId = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);

        if (Number.isNaN(listId)) {
            return res.status(400).json({
                error: "invalid list id"
            });
        }

        try {
            const items = await this.itemService.getItemsByListId(listId);
            res.status(200).json(items);
        } catch (error) {
            console.error("Error getting items: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }

    createItem = async (req: Request, res: Response) => {
        const { listId, name } = req.body;

        if (!listId || Number.isNaN(listId) || !name) {
            return res.status(400).json({
                error: "list id and name are required"
            });
        }

        try {
            const item = await this.itemService.createItem(
                listId,
                name
            );
            return res.status(201).json(item);
        } catch (error) {
            console.error("Error creating item: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }

    updateCheckItem = async (req: Request, res: Response) => {
        const { itemId, checked } = req.body;

        if (!itemId || !checked) {
            return res.status(400).json({
                error: "item id and checked are required"
            });
        }

        try {
            const item = await this.itemService.updateCheckItem(
                itemId,
                checked
            );
            return res.status(200).json(item);
        } catch (error) {
            console.error("Error updating checked from item: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }

    updateNameItem = async (req: Request, res: Response) => {
        const { itemId, name } = req.body;

        if (!itemId || !name) {
            return res.status(400).json({
                error: "item id and name are required"
            });
        }

        try {
            const item = await this.itemService.updateNameItem(
                itemId,
                name
            );
        return res.status(200).json(item);
        } catch (error) {
            console.error("Error updating name from item: ", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
    }

    deleteItem = async (req: Request, res: Response) => {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({
                error: "item id is required"
            });
        }

        try {
            const item = await this.itemService.deleteItem(
                itemId
            );
        return res.status(200).json(item);
        } catch (error) {
            console.error("Error updating name from item: ", error);
            
            return res.status(500).json({
                error: "internal server error"
            });
        }
    }
}