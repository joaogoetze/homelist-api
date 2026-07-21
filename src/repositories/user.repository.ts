import 'dotenv/config';
import { pool } from '../database';

export class UserRepository {

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