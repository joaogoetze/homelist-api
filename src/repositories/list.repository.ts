import 'dotenv/config'
import { pool } from '../database';

export class ListRepository {
    async getListByOwnerId(userId: number) {
        const { rows } = await pool.query(
            "SELECT id, name FROM lists WHERE owner_id = $1",
            [userId]
        );

        return rows;
    }

    async createList(ownerId: number, name: string) {
        const { rows } = await pool.query(
            "INSERT INTO lists (name, owner_id) VALUES ($1, $2) RETURNING *",
            [name, ownerId]
        );

        return rows;
    }

    async deleteList(listId: number) {
        const { rows } = await pool.query(
            "UPDATE lists SET deleted_at = now() WHERE id = $1 RETURNING *",
            [listId]
        );

        return rows;
    }
}