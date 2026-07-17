import { Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../errors/app.error';
import { AuthRequest } from '../middlewares/auth.middleware';

export class UserController {
    constructor(private userService: UserService) {}

    getMyUserInfo = async (req: AuthRequest, res: Response) => {
        const userId = Number(req.userId);
        
        if (Number.isNaN(userId)) {
            console.error('Invalid user id ');
            throw new AppError('ID do usuário inválido', 400);
        }
        
        const user = await this.userService.getMyUserInfo(userId);
        
        return res.status(200).json(user);
    }
}