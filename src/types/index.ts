import { Session, SessionData } from "express-session";
import { User } from "../user/user.model";

export {};

declare module 'express-serve-static-core'{
    interface Request {
        session: Session & Partial<SessionData>
    }
}

declare module 'express-session' {
    interface SessionData {
        user: Omit<User, 'password'>;
    }
}