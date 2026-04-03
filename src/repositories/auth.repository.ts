import 'dotenv/config';
import { pool } from '../database';

export class AuthRepository {
    async register(name: string, email: string, hashedPassword: string) {
        const { rows } = await pool.query(
            "INSERT INTO users (name, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        return rows[0];
    }

    async insertTokens(userId: number, refreshToken: string) {
        const { rows } = await pool.query(
            "INSERT INTO refresh_tokens (user_id, refresh_token, expires_at) VALUES ($1, $2, NOW() + interval '30 days') RETURNING *",
            [userId, refreshToken]
        );

        return rows;
    }

    async getUserByEmail(email: string) {
        const { rows } = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        return rows[0];
    }

    async getToken(refreshToken: string) {
        const { rows } = await pool.query(
            "SELECT * FROM refresh_tokens WHERE refresh_token = $1",
            [refreshToken]
        );
        
        return rows[0];
    }
}