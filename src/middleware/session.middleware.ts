import session from 'express-session';
import { pool } from '../db';

if(!process.env.COOKIE_SESSION_SECRET) {
    throw Error('Cookie session not found.')
}

export const sessionConfig = session({
    store: new (require('connect-pg-simple')(session))({
        pool: pool,
        tableName: "users_sessions",
        createTableIfMissing: true
    }),
    secret: process.env.COOKIE_SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
})