import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../errors/app.error';

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
                error: "email and password are required"
            });
        }

        try {
            const { accessToken, refreshToken } = await this.authService.login(email, password);
            return res.status(201).json({
                accessToken, refreshToken
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }
            console.error("Login error:", error);

            return res.status(500).json({
                error: "internal server error"
            });
        }
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