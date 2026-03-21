import bcrypt from 'bcrypt';
import 'dotenv/config';
import { AuthRepository } from '../repositories/auth.repository';
import { generateAcessToken, generateRefreshToken } from '../utils/tokens';
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthService {
    private authRepository = new AuthRepository();

    async register(name: string, email: string, password: string) {

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authRepository.register(name, email, hashedPassword);
        const userId = user.id;

        const accessToken = generateAcessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        await this.authRepository.insertTokens(Number(userId), refreshToken);

        return { accessToken, refreshToken };
    }

    async login(email: string, password: string) {
        const user = await this.authRepository.getUserByEmail(email);

        if (!user) throw new Error("Invalid credentials");

        const validPassword = await bcrypt.compare(
            password,
            user.hashed_password
        )
        

        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAcessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await this.authRepository.insertTokens(Number(user.id), refreshToken);

        return { user, accessToken, refreshToken };
    }

    async refresh(refreshToken: string) {
        const stored = await this.authRepository.getToken(refreshToken);

        if (!stored.rows.length) {
            throw new Error("Invalid tokens");
        }

        const payload = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
) as JwtPayload;

const accessToken = generateAcessToken(payload.userId);

        return accessToken;
    }
}