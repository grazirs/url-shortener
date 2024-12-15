import express, { Request, Response } from "express";
import { authMiddleware } from "..";
import { createUser, encryptPassword, findUserByEmail } from "./user.service";
import bcrypt from 'bcrypt';

export const userRoute = express.Router();

userRoute.post('/sign-up', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const searchUser= await findUserByEmail(email);

    if(searchUser !== undefined) {
        res.status(409).send('The email is already in use');
        return;
    } 

    if(email){
        if(typeof email !== 'string' || email.length < 3 || email.length > 50) {
            res.status(422).send("Something went wrong");
            return;
        }
    }

    if(password){
        if(typeof password !== 'string' || password.length < 3 || password.length > 50) {
            res.status(422).send("Something went wrong");
            return;
        }
   }

    const encryptedPassword = encryptPassword(password);
    const newUser = await createUser(email, encryptedPassword);
    if(newUser) {
        const { password, ...rest } = newUser;
        res.send(rest);
    } 
    
});

userRoute.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);
    if(user) {
        const userIsValid = bcrypt.compareSync(password, user.password );
   
        if(userIsValid){
            req.session.user = {
                id: user.id,
                email: user.email,
            };
            res.send('User authenticated successfully.');
        } else {
            res.status(401).send('Authentication failed.')
        }
    }
});