import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getMe, patchMe } from "./user.controller";
import { validateBody } from "../middleware/validator.middleware";
import { userSchema } from "./user.dto";

export const userRoute = express.Router();

userRoute.get('/me', [authMiddleware], getMe);
userRoute.patch('/me', [authMiddleware, validateBody(userSchema)], patchMe);