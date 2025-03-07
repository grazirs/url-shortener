import express from "express";
import { signIn, signUp } from "./auth.controller";
import { validateBody } from "../middleware/validator.middleware";
import { authSchema } from "./auth.dto";

export const authRoute = express.Router();

authRoute.post('/sign-up', [validateBody(authSchema)], signUp);
authRoute.post('/sign-in', [validateBody(authSchema)], signIn);
