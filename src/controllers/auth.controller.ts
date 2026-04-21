import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../errors/app.error';

export class AuthController {
    private authService = new AuthService();

    register = async(req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.error('Missing name, email or password');
            throw new AppError('Nome, email e senha são obrigatórios', 400);
        }

        const { accessToken, refreshToken } = await this.authService.register(name, email, password);
        return res.status(201).json({ accessToken, refreshToken });
    }

    login = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error('Missing email or password');
            throw new AppError('Email e senha são obrigatórios', 400);
        }

        const { accessToken, refreshToken } = await this.authService.login(email, password);
        return res.status(200).json({ accessToken, refreshToken });
    }

    refresh = async(req: Request, res: Response) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            console.error('Missing refresh token');
            throw new AppError('Token é obrigatório', 401);
        }

        const accessToken = await this.authService.refresh(refreshToken);
        return res.status(200).json({ accessToken });
    }
}