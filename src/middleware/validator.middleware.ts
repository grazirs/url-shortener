import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateBody(schema: ZodSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
        } catch (error) {
            res.status(422).send("Invalid data");
            return;
        }
        next();
    }
}