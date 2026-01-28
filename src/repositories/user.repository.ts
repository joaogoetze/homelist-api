import "dotenv/config";
import { pool } from "../database";

export class UserRepository {
    async findAll() {
        const { rows } = await pool.query(
            "SELECT id, name, email FROM users"
        );

        return rows;
    }
}