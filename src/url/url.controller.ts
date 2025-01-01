import { Request, Response } from "express";
import { createUrl, findUrl, findUrlsFromUser, removeUrl } from "./url.service";
import { AuthenticatedRequest } from "../types";
import { validateBody } from "../middleware/validator.middleware";

export async function urlId(req: Request, res: Response){
    const url = await findUrl(req.params.urlId);
    if(url){
        res.redirect(url.destination);
    }  else {
        res.status(404).send(`${req.params.urlId} does not exist`);
    }
}

export async function urls(req: Request, res: Response){
    const { destination } = req.body;
    validateBody(destination);
    const authRequest = req as AuthenticatedRequest;
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

export async function getUrls(req: Request, res: Response){
    const authRequest = req as AuthenticatedRequest;
    const userId = authRequest.session.user.id;
    const userUrls = await findUrlsFromUser(userId);  
    if(userUrls.length ) {
        res.json(userUrls); 
        return;
    }  
    res.send(`user ${userId} does not have urls`);
}

export async function deleteUrl(req: Request, res: Response) {
    const { urlId } = req.params;
    const authRequest = req as AuthenticatedRequest;
    const userId = authRequest.session.user.id;
    const url = await findUrl(urlId);
    if(!url) {
        res.status(404).send('Url not found');
        return;
    }

    if(url.user_id !== userId){
        res.status(403).send('Operation not allowed');
        return;
    }

    await removeUrl(urlId);
    res.send(`Url ${urlId} deleted successfully`);
}