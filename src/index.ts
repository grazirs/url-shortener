import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import { urlRoute } from './url/url.route';
import { authRoute } from './auth/auth.route';
import { sessionConfig } from './middleware/session.middleware';
import { userRoute } from './user/user.route';
import { urlId } from './url/url.controller';


export const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(sessionConfig);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', urlRoute);
app.get('/:urlId', urlId);

app.listen(PORT, () => {
    console.log('Server Ready');
})

