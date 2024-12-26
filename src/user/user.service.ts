import { pool } from '../db'

export async function updateUser(data: {name: string, email: string, id: number}){
    const text = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [data.name, data.email, data.id];
    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (error) {
        console.error('Something went wrong', error);
        throw error;
    }
}