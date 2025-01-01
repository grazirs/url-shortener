import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import { urlRoute } from './url/url.route';
import { authRoute } from './auth/auth.route';
import { sessionConfig } from './middleware/session.middleware';
import { userRoute } from './user/user.route';


export const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(express.json());
app.use(sessionConfig);
app.use(authRoute);
app.use(userRoute);
app.use(urlRoute);


app.listen(PORT, () => {
    console.log('Server Ready');
})

