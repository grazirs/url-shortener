import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteUrl, getUrls, urlId, urls } from "./url.controller";
import { validateBody } from "../middleware/validator.middleware";
import { urlSchema } from "./url.dto";

export const urlRoute = express.Router();

urlRoute.post('/urls', [validateBody(urlSchema)], urls);
urlRoute.delete('/urls/:urlId', [authMiddleware], deleteUrl);
urlRoute.get('/urls',[authMiddleware], getUrls);
