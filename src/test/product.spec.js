const producto = require("../routes/producto.routes");
const dotenv = require("dotenv");
const {sql,sqlConfig } = require("../database");
const request = require("supertest");

const api = request(producto);

describe("GET /", () => {
    /* let mockResponse;
    beforeAll(async () => {
        dotenv.config({ path: ".env" });
        await sql.connect(sqlConfig);
    }); */

   /*  beforeEach(() => {
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    }); */

    it('should responde with a 200 status code', async () => {
        await api
            .get("/hola")
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    /* afterAll(() => {
        sql.close();
    }) */
});

