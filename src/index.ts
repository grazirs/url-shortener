import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import { urlRoute } from './url/url.route';


const app = express();
const PORT = `${process.env.PORT}`;

app.use(helmet());
app.use(express.json());
app.use(urlRoute);

app.listen(PORT, () => {
    console.log('Server Ready');
})