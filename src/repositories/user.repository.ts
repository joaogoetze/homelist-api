import "dotenv/config";
import { pool } from "../database";

export class UserRepository {
    async findAll() {
        const { rows } = await pool.query(
            "SELECT name, email FROM users"
        );
        
        return rows;
    }
}