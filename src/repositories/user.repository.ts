import 'dotenv/config';
import { pool } from '../database';

export class UserRepository {

    async getMyUserInfo(userId: number) {
        const { rows } = await pool.query(`
            SELECT id, name, email 
            FROM users 
            WHERE id = $1
            `, [userId]
        );

        return rows[0];
    }

    async getUserByEmail(email: string) {
        const { rows } = await pool.query(`
            SELECT id 
            FROM users 
            WHERE email = $1
            LIMIT 1
            `, [email]
        );

        return rows[0];
    }
}