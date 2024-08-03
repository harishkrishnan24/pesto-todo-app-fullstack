import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import app from "../app";
import { dbConnect, dbDisconnect } from "../test/database";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Task Create Test Suite", () => {
  test("should create a new task with default state of pending", () => {
    return request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "This is a test task." })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("Test Task");
        expect(res.body.description).toBe("This is a test task.");
        expect(res.body.status).toBe("pending");
      });
  });

  test("should create a new task with state of completed", () => {
    return request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "This is a test task.",
        status: "completed",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("Test Task");
        expect(res.body.description).toBe("This is a test task.");
        expect(res.body.status).toBe("completed");
      });
  });

  test("should return bad request when task title is less than 3 characters", () => {
    return request(app)
      .post("/api/tasks")
      .send({
        title: "Te",
        description: "This is a test task.",
        status: "completed",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  test("should return bad request when task description is less than 5 characters", () => {
    return request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "This",
        status: "completed",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
