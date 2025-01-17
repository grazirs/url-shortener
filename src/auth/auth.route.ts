import express from "express";
import { login, signUp } from "./auth.controller";
import { validateBody } from "../middleware/validator.middleware";
import { authSchema } from "./auth.dto";

export const authRoute = express.Router();

authRoute.post('/api/sign-up', [validateBody(authSchema)], signUp);
authRoute.post('/api/login', [validateBody(authSchema)], login);
