const request = require("supertest");
// supertest lets us call our express routes like real http requests
// ref: https://github.com/visionmedia/supertest

const jestMock = require("jest-mock"); //if we need manual jest mocks

// Mock auth controller before importing app
// ref: https://jestjs.io/docs/manual-mocks
jest.mock("../controllers/authController.js", () => ({
  register: (req, res) => res.json({ message: "Registered" }),
  login: (req, res) => res.json({ message: "Logged in" }),
}));

const app = require("../index.js"); // require after the mock

describe("Auth API Integration (Beginner Level)", () => {
  test("POST /api/auth/register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.body.message).toBe("Registered"); // simple check to confirm mock works
  });

  test("POST /api/auth/login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.body.message).toBe("Logged in");
  });
});
