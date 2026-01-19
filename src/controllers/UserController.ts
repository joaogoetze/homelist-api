import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService = new UserService();

  list = async(req: Request, res: Response) => {
    const users = await this.userService.list();
    return res.json(users);
  }

  create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  }
}