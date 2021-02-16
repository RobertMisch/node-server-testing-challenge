const supertest = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

beforeEach(() => {
    return db.migrate.rollback().then(()=>db.migrate.latest()).then(()=>db.seed.run());
});

describe("server", () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    });

    describe("GET /", () => {
        it("should return http status code 200 OK", () => {
            return (
                supertest(server)
                    .get("/")
                    // .expect(200) // from supertest
                    .then(response => {
                        // from jest
                        expect(response.status).toBe(200);
                    })
            );
        });

        it("should return { api: 'up' }", () => {
            return supertest(server)
                .get("/")
                .then(response => {
                    expect(response.body).toEqual({ api: "up" });
                    expect(response.body.api).toBeDefined();
                    expect(response.body.api).toBe("up");
                });
        });
    });

    describe("GET /test2", () => {
        it("should return an array", () => {
            return supertest(server)
                .get("/test2")
                .then(response => {
                    expect(Array.isArray(response.body)).toBe(true);
                });
        });
    });

    describe("GET /test2", () => {
        it("should return an array with 4 elements", () => {
            return supertest(server)
                .get("/test2")
                .then(response => {
                    console.log(response.body)
                    expect(response.body.length).toBe(4);
                });
        });
    });
    describe("POST /test2", () => {
        it("should return 201", () => {
            return supertest(server)
                .post("/test2")
                .send({ "name": "newname" })
                .then(response => {
                    expect(response.status).toBe(201);
                    expect(response.body).toEqual([5])
                });
        });
    })
    
    describe("DELETE /test2/:id", () => {
        it("should return 404", () => {
            return supertest(server)
                .del("/test2/1")
                .then(response => {
                    expect(response.status).toBe(200)
                });
        });
    });
});