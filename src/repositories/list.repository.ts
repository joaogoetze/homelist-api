import 'dotenv/config'
import { pool } from '../database';

export class ListRepository {
    async findAll() {
        const { rows } = await pool.query(
            "SELECT * FROM lists"
        );

        return rows;
    }
}