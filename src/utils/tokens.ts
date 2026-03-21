import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function generateAcessToken(userId: number) {
    return jwt.sign(
        {userId },
        ACCESS_SECRET,
        { expiresIn: "15m" }
    );
}

export function generateRefreshToken(userId: number) {
    return jwt.sign(
        { userId },
        REFRESH_SECRET,
        { expiresIn: "30d" }
    );
}