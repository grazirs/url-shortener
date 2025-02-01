import { Request, Response } from "express";
import { createUser, encryptPassword, findUserByEmail } from "./auth.service";
import bcrypt from 'bcrypt';
import { associateUrlsToUser } from "../url/url.service";

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    const clientId = req.headers['clientid'] as string;

    const searchUser = await findUserByEmail(email);

    if (searchUser !== undefined) {
        res.status(409).send('The email is already in use');
        return;
    }
    const encryptedPassword = encryptPassword(password);
    const newUser = await createUser({email: email,  password: encryptedPassword});
    if (newUser) {
        const { password, ...rest } = newUser;
        
        if (clientId) {
            await associateUrlsToUser(newUser.id, clientId);
        }
        res.send(rest);
    }
}

export async function signIn(req: Request, res: Response) {
    const { email, password, clientId} = req.body;

    const user = await findUserByEmail(email);

    if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (passwordIsValid) {
            req.session.user = {
                id: user.id,
                email: user.email,
            };
            
            if (clientId) {
                await associateUrlsToUser(user.id, clientId);
            }
            
            res.send('User authenticated successfully.');
        } else {
            res.status(401).send('Authentication failed.');
        }
    } else {
        res.status(401).send('Something went wrong');
    }

}