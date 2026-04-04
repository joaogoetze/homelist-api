import 'dotenv/config';
import { pool } from '../database';

export class ItemRepository {

    async getItemsByListId(listId: number) {
        const { rows } = await pool.query(
            "SELECT id, list_id, name, checked FROM items WHERE list_id = $1 and deleted_at is null ORDER BY id ASC",
            [listId]
        );

        return rows;
    }

    async createItem(listId: number, name: string) {
        const { rows } = await pool.query(
            "INSERT INTO items (list_id, name) VALUES ($1, $2) RETURNING *",
            [listId, name]
        );

        return rows[0];
    }

    async updateItemCheck(itemId: number, checked: boolean) {
        const { rows } = await pool.query(
            "UPDATE items SET checked = $1 WHERE id = $2 RETURNING *",
            [checked, itemId]
        );

        return rows[0];
    }

    async updateItemName(itemId: number, name: string) {
        const { rows } = await pool.query(
            "UPDATE items SET name = $1 WHERE id = $2 RETURNING *",
            [name, itemId]
        );

        return rows[0];
    }

    async deleteItem(itemId: number) {
        const { rows } = await pool.query(
            "UPDATE items SET deleted_at = now() WHERE id = $1 RETURNING *",
            [itemId]
        );

        return rows[0];
    }
}