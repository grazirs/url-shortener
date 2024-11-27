import express, { Request, Response } from "express";
import { findUrl } from "./url.service";


export const urlRoute = express.Router();

urlRoute.get('/urls/:urlId', async (req: Request, res: Response) => {
   const url = await findUrl(req.params.urlId);

    if(url){
        res.redirect(url.destination);
    }  else {
        res.status(404).send(`${req.params.urlId} does not exist`);
    }
});