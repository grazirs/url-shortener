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

export async function createUrl(urlId: string, destination: string, userId: number ){
    const text = 'INSERT INTO urls (id, destination, user_id) VALUES($1, $2, $3) RETURNING *';
    const values = [urlId, destination, userId];

    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}

