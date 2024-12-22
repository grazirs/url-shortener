import { Request, Response } from "express";
import { createUrl, findUrl } from "./url.service";
import { AuthenticatedRequest } from "../types";

export async function urlId(req: Request, res: Response){
    const url = await findUrl(req.params.urlId);

    if(url){
        res.redirect(url.destination);
    }  else {
        res.status(404).send(`${req.params.urlId} does not exist`);
    }
}

export async function urls(req: Request, res: Response){
    const authRequest = req as AuthenticatedRequest;
    const { destination } = req.body;
    const userId = authRequest.session.user.id;

    if(userId && destination.length > 0) {
        const newUrl = await createUrl(destination, userId);
        if(newUrl) {
            res.send(newUrl);
        }
    } else {
        res.status(401).send('something went wrong');
    }
}