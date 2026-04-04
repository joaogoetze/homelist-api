import 'dotenv/config'
import { pool } from '../database';

export class ListRepository {
    async getListByOwnerId(userId: number) {
        const { rows } = await pool.query(
            "SELECT id, name FROM lists WHERE $1 = ANY(owner_ids) AND deleted_at IS NULL",
            [userId]
        );

        return rows;
    }

    async createList(ownerId: number, name: string) {
        const { rows } = await pool.query(
            "INSERT INTO lists (name, owner_ids) VALUES ($1, $2) RETURNING *",
            [name, [ownerId]]
        );

        return rows[0];
    }

    async addListUser(listId: number, userId: number) {
        const { rows } = await pool.query(
            "UPDATE lists SET owner_ids = array_append(owner_ids, $1) WHERE id = $2 RETURNING *",
            [userId, listId]
        );

        return rows[0];
    }

    async updateListName(listId: number, name: string) {
        const { rows } = await pool.query(
            "UPDATE lists SET name = $1 WHERE id = $2 RETURNING *",
            [name, listId]
        );
        
        return rows[0];
    }
    
    async deleteList(listId: number) {
        const { rows } = await pool.query(
            "UPDATE lists SET deleted_at = now() WHERE id = $1 RETURNING *",
            [listId]
        );

        return rows[0];
    }

    async getUserByEmail(email: string) {
        const { rows } = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        return rows[0];
    }
}