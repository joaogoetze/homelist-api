import 'dotenv/config';
import { pool } from '../database';

export class ItemRepository {
    async list() {
        const { rows } = await pool.query(
            "SELECT * FROM items"
        );

        return rows;
    }

    async getItemsByListId(listId: number) {
        const { rows } = await pool.query(
            "SELECT * FROM items WHERE list_id = $1",
            [listId]
        );

        return rows;
    }

    async createItem(listId: number, name: string) {
        const { rows } = await pool.query(
            "INSERT INTO items (list_id, name) VALUES ($1, $2) RETURNING *",
            [listId, name]
        );

        return rows;
    }
}