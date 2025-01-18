import { pool } from '../db'

export async function updateUser(data: {email: string, id: number}){
    const text = 'UPDATE users SET email = $1 WHERE id = $2 RETURNING *';
    const values = [data.email, data.id];
    try {
        const res = await pool.query(text, values);
        return res.rows[0];
    } catch (error) {
        console.error('Something went wrong', error);
        throw error;
    }
}

export async function getUser(userId: number){
    const text = 'SELECT * from users WHERE id = $1';
    const values = [userId];

    try{
        const res = await pool.query(text, values);
        console.log(res.rows[0]);
        return res.rows[0];
    }catch(error){
        console.error('Something went wrong', error);
        throw error;
    }
}