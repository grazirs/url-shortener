import { pool } from "../db";
import { nanoid } from 'nanoid';

export async function findUrl(urlId: string){
    try {
        const res = await pool.query('SELECT * FROM urls WHERE id = $1', [urlId]);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}

export async function createUrl(destination: string, userId: number | null, clientId: string){
    const LENGTH = 7;
    const urlId = nanoid(LENGTH);
    const text = 'INSERT INTO urls (id, destination, user_id, client_id) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [urlId, destination, userId, clientId];

    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}

export async function findUrlsFromUser(userId: number) {
    try {
        const res = await pool.query('SELECT * FROM urls WHERE user_id = $1', [userId]);
        return res.rows;
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}

export async function removeUrl(urlId: string){
    try{
        const res = await pool.query('DELETE FROM urls WHERE id = $1', [urlId]);
        return res.rows;
    } catch(error){
        console.error('Something went wrong:', error);
        throw error; 
    }
}

export async function associateUrlsToUser(userId: number | null, clientId: string){
    try {
        const checkQuery = `SELECT user_id FROM urls WHERE client_id = $1 LIMIT 1`;
        const checkResult = await pool.query(checkQuery, [clientId]);

        if (checkResult.rows.length > 0 && checkResult.rows[0].user_id !== null) {
            console.log("URLs are already associated with a user.");
            return;
        }

        const updateQuery = `UPDATE urls SET user_id = $1 WHERE client_id = $2 AND user_id IS NULL`;
        await pool.query(updateQuery, [userId, clientId]);

        console.log(`Associated URLs from clientId ${clientId} to user ${userId}`);
    } catch (err) {
        console.error('Failed to associate URLs:', err);
        throw err;
    }
}
