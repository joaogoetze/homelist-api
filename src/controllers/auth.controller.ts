import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService = new AuthService();

    register = async(req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "name, email and password are required"
            });
        }

        const { accessToken, refreshToken } = await this.authService.register(name, email, password);
        return res.status(201).json({
            accessToken, refreshToken
        });
    }

    login = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "invalid data"
            });
        }

        const { accessToken, refreshToken } = await this.authService.login(email, password);
        return res.status(200).json({
            accessToken, refreshToken
        });
    }

    refresh = async(req: Request, res: Response) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                error: "refresh token is required"
            });
        }

        const accessToken = await this.authService.refresh(refreshToken);
        return res.json({ accessToken });
    }
}