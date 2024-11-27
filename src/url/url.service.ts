import { pool } from "../db";

export async function findUrl(urlId: string){
    try {
        const res = await pool.query('SELECT * FROM urls WHERE id = $1', [urlId]);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}
