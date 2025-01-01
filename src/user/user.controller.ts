import { Request, Response } from "express";
import { validateBody } from "../middleware/validator.middleware";
import { userSchema } from "./user.dto";
import { AuthenticatedRequest } from "../types";
import { updateUser } from "./user.service";

export async function getMe(req: Request, res: Response){
    const { password, ...result } = req.body;
    res.json(result);
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