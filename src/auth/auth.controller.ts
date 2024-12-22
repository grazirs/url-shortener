import { Request, Response } from "express";
import { createUser, encryptPassword, findUserByEmail } from "./auth.service";
import bcrypt from 'bcrypt';

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || email.length < 3 || email.length > 50) {
        res.status(422).send("Invalid email format");
        return;
    }

    if (!password || typeof password !== 'string' || password.length < 3 || password.length > 50) {
        res.status(422).send("Invalid password format");
        return;
    }

    const searchUser = await findUserByEmail(email);

    if (searchUser !== undefined) {
        res.status(409).send('The email is already in use');
        return;
    }
    const encryptedPassword = encryptPassword(password);
    const newUser = await createUser({email: email,  password: encryptedPassword});
    if (newUser) {
        const { password, ...rest } = newUser;
        res.send(rest);
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || email.length < 3 || email.length > 50) {
        res.status(422).send("Invalid email format");
        return;
    }

    if (!password || typeof password !== 'string' || password.length < 3 || password.length > 50) {
        res.status(422).send("Invalid password format");
        return;
    }

    const user = await findUserByEmail(email);

    if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (passwordIsValid) {
            req.session.user = {
                id: user.id,
                email: user.email,
            };
            res.send('User authenticated successfully.');
        } else {
            res.status(401).send('Authentication failed.');
        }
    } else {
        res.status(401).send('Something went wrong');
    }

}