import { Request, Response } from "express";
import { createUrl, findUrl, findUrlsFromUser, removeUrl } from "./url.service";
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
    const { destination } = req.body;
    const clientId = req.headers['clientid'] as string;

    const authRequest = req as AuthenticatedRequest;
    const userId = authRequest.session?.user?.id || null;

    if (!destination || destination.length === 0) {
        res.status(400).send('Invalid destination URL');
        return;
    }
    
    const newUrl = await createUrl(destination, userId, clientId);
    
    if (newUrl) {
        const url = `https://localhost:3000/${newUrl.id}`
        res.send(url);
        return;
    }

    res.status(500).send('Something went wrong');
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