import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../errors/app.error';
import { AuthRequest } from '../middlewares/auth.middleware';

export class UserController {
    private userService = new UserService();

    getMyUserInfo = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        
        if (Number.isNaN(userId)) {
            throw new AppError('invalid user id', 400);
        }
        
        const user = await this.userService.getMyUserInfo(userId);
        res.status(200).json(user);
    }
}