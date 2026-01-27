import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private userService = new UserService();

    list = async (req: Request, res: Response) => {
        const users = await this.userService.list();
        res.json(users);
    }
}