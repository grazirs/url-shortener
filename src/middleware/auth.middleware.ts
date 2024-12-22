import { NextFunction, Request, Response } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { user } = req.session;
    if(!user){
        res.status(401).send('User not authorized');
    } else {
        next();
    }
}
