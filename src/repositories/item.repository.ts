import 'dotenv/config';
import { pool } from '../database';

export class ItemRepository {
    async findAll() {
        const { rows } = await pool.query(
            "SELECT * FROM items"
        );

        return rows;
    }
}