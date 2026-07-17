import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository';
import { AppError } from '../errors/app.error';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async register(name: string, email: string, password: string) {
        const existingUser = await this.authRepository.getUserByEmail(email);

        if (existingUser) throw new AppError('Email já cadastrado', 400);
        
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

        if (!user) throw new AppError('Credenciais inválidas', 401);

        const validPassword = await bcrypt.compare(
            password,
            user.hashed_password
        )
        
        if (!validPassword) throw new AppError('Credenciais inválidas', 401);
        
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        const userId = user.id;

        await this.authRepository.insertTokens(Number(user.id), refreshToken);

        return { accessToken, refreshToken, userId };
    }

    async refresh(refreshToken: string) {
        const stored = await this.authRepository.getToken(refreshToken);

        if (!stored) throw new AppError('Token inválido', 401);

        const payload = jwt.verify(
            refreshToken,
            REFRESH_SECRET
        ) as JwtPayload;

        const accessToken = generateAccessToken(payload.userId);

        return accessToken;
    }    
}

    function generateAccessToken(userId: number) {
        return jwt.sign(
            { userId },
            ACCESS_SECRET,
            { expiresIn: "7d" }
        );
    }

    function generateRefreshToken(userId: number) {
        return jwt.sign(
            { userId },
            REFRESH_SECRET,
            { expiresIn: "30d" }
        );
    }