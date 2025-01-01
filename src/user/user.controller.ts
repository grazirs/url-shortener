import { Request, Response } from "express";
import { validateBody } from "../middleware/validator.middleware";
import { userSchema } from "./user.dto";
import { AuthenticatedRequest } from "../types";
import { getUser, updateUser } from "./user.service";

export async function getMe(req: Request, res: Response){
    const authRequest = req as AuthenticatedRequest;
    const userId = authRequest.session.user.id;
    const result = await getUser(userId);
    if(result){
        const { password, ...rest} = result;
        res.json(rest);
    } else {
        res.status(404).send(`User ${userId} not found`);
    }
}

export async function patchMe(req: Request, res: Response){
    const authRequest = req as AuthenticatedRequest;
    const id = authRequest.session.user.id;
    const { name, email } = req.body;
    validateBody(userSchema);
    const userUpdated = await updateUser({name: name, email: email, id: id});
 
    if(userUpdated) {
        const { password, id, ...rest} = userUpdated;
        res.send(rest);
    } else {
        res.status(422).send('User could not be updated successfully');
    }
}