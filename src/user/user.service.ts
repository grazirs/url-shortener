import { pool } from "../db";
import bcrypt from 'bcrypt';

export async function findUserByEmail(email: string){
    try {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}

export function encryptPassword(password: string){
    return bcrypt.hashSync(password, 10);
}

export async function createUser(email: string, password: string){
    const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';
    const values = [email, password];

    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (err) {
        console.error('Something went wrong:', err);
        throw err; 
    }
}
 