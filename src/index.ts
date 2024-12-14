import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import { urlRoute } from './url/url.route';
import session from 'express-session';
import { pool } from './db';
import bcrypt from 'bcrypt';

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

app.get('/login',(req, res) => {
    (req.session as any).username = 'Grazi';
    res.send();
})

app.use(urlRoute);

app.listen(PORT, () => {
    console.log('Server Ready');
})

const hashedString = bcrypt.hashSync('eat', 10);
console.log(bcrypt.compareSync('eat', hashedString));