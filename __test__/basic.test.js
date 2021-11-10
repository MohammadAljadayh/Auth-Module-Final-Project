
"use strict";
const { server } = require('../src/server'); 
const supertest = require("supertest");
const request = supertest(server);

describe("Just For Deploy", () => {
    // bad route
    it("handles not found request", async () => {
      const response = await request.get('/foo');
      expect(response.status).toBe(404);
    });

    test('/Root', async () => {

        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('auth-api server')
    
      });
});