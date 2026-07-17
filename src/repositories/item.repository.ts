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

    async createItem(listId: number, name: string, checked: boolean) {
        const { rows } = await pool.query(
            "INSERT INTO items (list_id, name, checked) VALUES ($1, $2, $3) RETURNING *",
            [listId, name, checked]
        );

        return rows[0];
    }

            async getItemsByUpdatedDate(userId: number, date: Date) {
                // console.log("Id do user", userId);
                // console.log("data", date);
                
                
            const { rows } = await pool.query(
                `SELECT i.* 
                FROM items i
                join lists l on l.id = i.list_id 
                WHERE $1 = ANY(l.owner_ids) AND i.updated_at > $2`,
                [userId, date]
            );
            console.log("items para atualizar", rows);
            
            return rows;
        }

    // async updateItemCheck(itemId: number, checked: boolean) {
    //     const { rows } = await pool.query(
    //         "UPDATE items SET checked = $1 WHERE id = $2 RETURNING *",
    //         [checked, itemId]
    //     );

    //     return rows[0];
    // }

    // async updateItemName(itemId: number, name: string) {
    //     const { rows } = await pool.query(
    //         "UPDATE items SET name = $1 WHERE id = $2 RETURNING *",
    //         [name, itemId]
    //     );

    //     return rows[0];
    // }

    async updateItem(itemId: number, name: string, checked: boolean) {
        console.log("itemid", itemId, "name", name, "checked", checked);
        
        const { rows } = await pool.query(
            "UPDATE items SET name = $1, checked = $2, updated_at = now() WHERE id = $3 RETURNING *",
            [name, checked, itemId]
        );

        console.log('rows', rows);
        

        return rows[0];
    }

    async deleteItem(itemId: number) {
        const { rows } = await pool.query(
            "UPDATE items SET deleted_at = now(), updated_at = now() WHERE id = $1 RETURNING *",
            [itemId]
        );

        return rows[0];
    }
}