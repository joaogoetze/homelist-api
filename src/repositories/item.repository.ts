import 'dotenv/config';
import { pool } from '../database';

export class ItemRepository {

    async getItemsByUpdatedDate(userId: number, date: Date) {                
        const { rows } = await pool.query(`
            SELECT i.* 
            FROM items i
            JOIN lists l ON l.id = i.list_id 
            WHERE $1 = ANY(l.owner_ids) AND i.updated_at > $2
            `, [userId, date]
        );  
        
        return rows;
    }

    async createItem(listId: number, name: string, checked: boolean) {
        const { rows } = await pool.query(`
            INSERT INTO items 
            (list_id, name, checked) 
            VALUES ($1, $2, $3) 
            RETURNING *
            `, [listId, name, checked]
        );

        return rows[0];
    }

    async updateItem(itemId: number, name: string, checked: boolean) {
        const { rows } = await pool.query(`
            UPDATE items 
            SET name = $1, checked = $2, updated_at = NOW() 
            WHERE id = $3 
            RETURNING *
            `, [name, checked, itemId]
        );

        return rows[0];
    }

    async deleteItem(itemId: number) {
        const { rows } = await pool.query(`
            UPDATE items 
            SET deleted_at = NOW(), updated_at = NOW() 
            WHERE id = $1 
            RETURNING *
            `, [itemId]
        );

        return rows[0];
    }
}