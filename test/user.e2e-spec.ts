import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("UserController (e2e)", () => {
  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("POST /user - should create a new user", async () => {
    const userDto = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "Password123", 
    };

    const response = await request(app.getHttpServer())
      .post("/user")
      .send(userDto)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(userDto.name);
    expect(response.body.email).toBe(userDto.email);

    createdUserId = response.body.id; // Save ID for later tests
  });

  it("GET /user - should return all users", async () => {
    const response = await request(app.getHttpServer())
      .get("/user")
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /user/:id - should return one user", async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .expect(200);

    expect(response.body).toHaveProperty("id", createdUserId);
  });

  it("PATCH /user/:id - should update user", async () => {
    const updateDto = { name: "John Updated" };

    const response = await request(app.getHttpServer())
      .patch(`/user/${createdUserId}`)
      .send(updateDto)
      .expect(200);

    expect(response.body).toHaveProperty("name", "John Updated");
  });

  it("DELETE /user/:id - should delete user", async () => {
    await request(app.getHttpServer())
      .delete(`/user/${createdUserId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
