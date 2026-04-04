import bcrypt from 'bcrypt';
import 'dotenv/config';
import { AuthRepository } from '../repositories/auth.repository';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/app.error';

export class AuthService {
    private authRepository = new AuthRepository();

    async register(name: string, email: string, password: string) {
        const existingUser = await this.authRepository.getUserByEmail(email);
        if (existingUser) {
            throw new AppError('email already in use', 400);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await this.authRepository.register(name, email, hashedPassword);
        const userId = user.id;

        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        await this.authRepository.insertTokens(Number(userId), refreshToken);

        return { accessToken, refreshToken };
    }

    async login(email: string, password: string) {
        const user = await this.authRepository.getUserByEmail(email);

        if (!user) throw new AppError('invalid credentials', 401);

        const validPassword = await bcrypt.compare(
            password,
            user.hashed_password
        )
        
        if (!validPassword) throw new AppError('invalid credentials', 401);

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await this.authRepository.insertTokens(Number(user.id), refreshToken);

        return { accessToken, refreshToken };
    }

    async refresh(refreshToken: string) {
        const stored = await this.authRepository.getToken(refreshToken);

        if (!stored) {
            throw new AppError('invalid tokens', 401);
        }

        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as JwtPayload;

        const accessToken = generateAccessToken(payload.userId);

        return accessToken;
    }
}