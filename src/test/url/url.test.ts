import request from "supertest";
import { app } from "../../";
import { nanoid } from "nanoid";

describe("when url is processed", () => {
    it("redirects to the correct page ", async () => {

        const urlId = nanoid(7);
        const response = await request(app).get(`/${urlId}`).send();

        expect(response.statusCode).toBe(302);
    })
})