import 'dotenv/config';
import { pool } from '../database';

export class ItemRepository {

    async getItemsByListId(listId: number) {
        const { rows } = await pool.query(
            "SELECT id, list_id, name, checked FROM items WHERE status = 1 AND list_id = $1 ORDER BY id ASC",
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

    async updateCheckItem(itemId: number, checked: boolean) {
        const { rows } = await pool.query(
            "UPDATE items SET checked = $1 WHERE id = $2 RETURNING *",
            [checked, itemId]
        );

        return rows;
    }

    async updateNameItem(itemId: number, name: string) {
        const { rows } = await pool.query(
            "UPDATE items SET name = $1 WHERE id = $2 RETURNING *",
            [name, itemId]
        );

        return rows;
    }

    async deleteItem(itemId: number) {
        const { rows } = await pool.query(
            "UPDATE items SET deleted_at = now() WHERE id = $1 RETURNING *",
            [itemId]
        );

        return rows;
    }
}