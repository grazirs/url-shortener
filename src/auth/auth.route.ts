import express from "express";
import { login, signUp } from "./auth.controller";

export const authRoute = express.Router();

authRoute.post('/sign-up', signUp);
authRoute.post('/login', login);