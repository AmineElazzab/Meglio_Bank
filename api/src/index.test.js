const res = require("supertest");
const app = require("./index");

describe("GET accounts", () => {
    it("should return all accounts", async() => {
       const request = await res(app).get("/api/accounts/get-all-accounts");
         expect(request.status).toBe(200);
    });
    }
);

// describe("GET users", () => {
//     it("should return all users", async() => {
//        const request = await res(app).get("/api/users/get-all-users");
//          expect(request.status).toEqual(200);
//     });
//     }
// );