import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { urlId, urls } from "./url.controller";

export const urlRoute = express.Router();

urlRoute.get('/:urlId', urlId);
urlRoute.post('/urls', [authMiddleware], urls)
