//mocking express : https://stackoverflow.com/questions/51391080/how-to-mock-express-response
const { getProfile, updateProfile, deleteProfile } = require("../controllers/profileController.js");
const { register } = require("../controllers/authController.js");

// Mock User model. ref: jest mocks:https://jestjs.io/docs/mock-functions
const mockSave = jest.fn();

jest.mock("../models/User.js", () => {
  // fake user  for tests
  const mockUser = function (data) {
    return {
      ...data,
      save: mockSave.mockResolvedValue(data),
    };
  };

  // Mock static methods
  mockUser.findById = jest.fn();
  mockUser.findByIdAndUpdate = jest.fn();
  mockUser.findByIdAndDelete = jest.fn();
  mockUser.findOne = jest.fn();

  return mockUser;
});

const User = require("../models/User.js");

// Helpers to mock req and res
function mockReq(body = {}, user = {}) {
  return { body, user };
}

//for simulating express res
function mockRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("Profile Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks for clean tests
  });

  test("getProfile should return user", async () => {
    const fakeUser = { name: "John" };

    User.findById.mockReturnValue({ // mock mongoose chain: findById().select()
      select: jest.fn().mockResolvedValue(fakeUser),
    });

    const req = mockReq({}, { id: "user1" });
    const res = mockRes();

    await getProfile(req, res);

    expect(res.json).toHaveBeenCalledWith(fakeUser);
  });

  test("updateProfile should update user", async () => {
    const updated = { name: "Updated" };

    User.findByIdAndUpdate.mockReturnValue({
      select: jest.fn().mockResolvedValue(updated),
    });

    const req = mockReq({ name: "Updated" }, { id: "user1" });
    const res = mockRes();

    await updateProfile(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Profile updated successfully",
      user: updated,
    });
  });

  test("deleteProfile should delete user", async () => {
    User.findByIdAndDelete.mockResolvedValue(true);

    const req = mockReq({}, { id: "user1" });
    const res = mockRes();

    await deleteProfile(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Account deleted successfully",
    });
  });
});

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register should create user", async () => {
    User.findOne.mockResolvedValue(null); // means email not used
    mockSave.mockResolvedValueOnce({ name: "Test", email: "test@example.com" });

    const req = mockReq({
      name: "Test",
      email: "test@example.com",
      password: "123",
      role: "driver",
      phone: "111",
      vehicleDetails: { plate: "ABC" },
    });
    const res = mockRes();

    await register(req, res);

    // basic success checks
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: "Registration successful",
      user: expect.any(Object),
    }));
  });

  test("register should fail if email exists", async () => {
    User.findOne.mockResolvedValue({ email: "exists@example.com" });

    const req = mockReq({
      email: "exists@example.com",
      password: "123",
    });
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already in use" });
  });
});
