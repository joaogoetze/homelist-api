import 'dotenv/config';
import { pool } from '../database';

export class UserRepository {

    async getMyUserInfo(userId: number) {
        const { rows } = await pool.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [userId]
        );

        return rows[0];
    }
}