import { Request, Response } from 'express';
import { ListService } from '../services/list.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AppError } from '../errors/app.error';

export class ListController {
    private listService = new ListService();

    getListsByOwnerId = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        
        if (Number.isNaN(userId)) {
            console.error('Invalid user id');
            throw new AppError('ID do usuário inválido', 400);
        }

        const lists = await this.listService.getListByOwnerId(userId);
        res.status(200).json(lists);
    }

    createList = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        const { name } = req.body;

        if (Number.isNaN(userId)) {
            console.error('Invalid user id');
            throw new AppError('ID do usuário inválido', 400);
        }

        if (!name) {
            console.error('Name is required');
            throw new AppError('Nome é obrigatório', 400);
        }

        const list = await this.listService.createList(userId, name);
        res.status(201).json(list);
    }

    addListUser = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);
        const { email } = req.body;

        if (!listId || Number.isNaN(listId) || !email) {
            console.error('List id and email are required');
            throw new AppError('ID da lista e email são obrigatórios', 400);
        }
        
        const list = await this.listService.addListUser(listId, email);
        return res.status(200).json(list);
    }

    updateListName = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        const listId = Number(req.params.listId);
        const { name } = req.body;

        if (Number.isNaN(userId)) {
            console.error('Invalid user id');
            throw new AppError('ID do usuário inválido', 400);
        }

        if (!listId || Number.isNaN(listId) || !name) {
            console.error('List id and name are required');
            throw new AppError('ID da lista e nome são obrigatórios', 400);
        }

        const list = await this.listService.updateListName(listId, name);
        res.status(200).json(list);
    }


    deleteList = async (req: Request, res: Response) => {
        const listId = Number(req.params.listId);

        if (!listId || Number.isNaN(listId)) {
            console.error('List id is required');
            throw new AppError('ID da lista é obrigatório', 400);
        }

        const list = await this.listService.deleteList(listId);
        return res.status(200).json(list);
    }
}