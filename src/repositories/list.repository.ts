import 'dotenv/config'
import { pool } from '../database';

export class ListRepository {

    async createList(ownerId: number, name: string) {
        const { rows } = await pool.query(
            "INSERT INTO lists (name, owner_ids) VALUES ($1, $2) RETURNING *",
            [name, [ownerId]]
        );

        return rows[0];
    }

    async updateList(listId: number, name: string) {
        const { rows } = await pool.query(
            "UPDATE lists SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
            [name, listId]
        );
        
        return rows[0];
    }
    
    async deleteList(listId: number) {
        const { rows } = await pool.query(
            "UPDATE lists SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *",
            [listId]
        );

        return rows[0] ?? null;
    }

    async getListsByUpdatedDate(userId: number, date: Date) {
        console.log('date', date);
                const { rows } = await pool.query(
            "SELECT * FROM lists WHERE $1 = ANY(owner_ids) AND updated_at > $2",
            [userId, date]
        );
        console.log("dados", rows);
        
        return rows;
    }

    async getListByOwnerId(userId: number) {
        const { rows } = await pool.query(
            "SELECT id, name FROM lists WHERE $1 = ANY(owner_ids) AND deleted_at IS NULL",
            [userId]
        );
        return rows;
    }

    async addListUser(listId: number, userId: number) {
        console.log("ID da lista", listId);
        console.log("ID do usuário", userId);
        
        
        const { rows } = await pool.query(
            "UPDATE lists SET owner_ids = array_append(owner_ids, $1) WHERE id = $2 RETURNING *",
            [userId, listId]
        );

        return rows[0];
    }
}