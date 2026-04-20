import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../errors/app.error';

export class AuthController {
    private authService = new AuthService();

    register = async(req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new AppError('name, email and password are required', 400);
        }

        const { accessToken, refreshToken } = await this.authService.register(name, email, password);
        return res.status(201).json({ accessToken, refreshToken });
    }

    login = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error('Missing email or password');
            throw new AppError('email and password are required', 400);
        }

        const { accessToken, refreshToken } = await this.authService.login(email, password);
        return res.status(200).json({ accessToken, refreshToken });
    }

    refresh = async(req: Request, res: Response) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError('invalid tokens', 401);
        }

        const accessToken = await this.authService.refresh(refreshToken);
        return res.status(200).json({ accessToken });
    }
}