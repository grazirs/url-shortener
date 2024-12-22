import { Session, SessionData } from "express-session";
import { User } from "../user/user.model";
import { Request } from "express";

declare module 'express-session' {
    interface SessionData {
        user: Omit<User, 'password'>;
    }
}

export interface AuthenticatedRequest extends Request {
    session:  Session & SessionData
}