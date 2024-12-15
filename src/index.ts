import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { urlRoute } from './url/url.route';
import { userRoute } from './user/user.route';
import session from 'express-session';
import { pool } from './db';

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());

if(!process.env.COOKIE_SESSION_SECRET) {
    throw Error('Cookie session not found.')
}

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool: pool,
        tableName: "users_sessions",
        createTableIfMissing: true
    }),
    secret: process.env.COOKIE_SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

app.use(userRoute);
app.use(urlRoute);

app.listen(PORT, () => {
    console.log('Server Ready');
})


export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { user } = req.session;
    if(!user){
        res.status(401).send('User not authorized');
    } else {
        next();
    }
}
