import express, { Request, Response } from "express";
import { createUrl, findUrl } from "./url.service";
import generateRandomString from "../generateRandomString";
import { authMiddleware } from "..";


export const urlRoute = express.Router();

urlRoute.get('/:urlId', async (req: Request, res: Response) => {
   const url = await findUrl(req.params.urlId);

    if(url){
        res.redirect(url.destination);
    }  else {
        res.status(404).send(`${req.params.urlId} does not exist`);
    }
});

urlRoute.post('/urls', [authMiddleware], async (req: Request, res: Response) => {
    const { destination } = req.body;
    const LENGTH = 6;
    const urlId = generateRandomString(LENGTH);
    const userId = req.session.user?.id;

    if(userId && destination.length > 0) {
        const newUrl = await createUrl(urlId, destination, userId);
        if(newUrl) {
            res.send(newUrl);
        }
    } else {
        res.status(401).send('something went wrong');
    }
})
