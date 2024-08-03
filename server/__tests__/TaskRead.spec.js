import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import app from "../app";
import { dbConnect, dbDisconnect } from "../test/database";
import TaskModel from "../models/taskModel";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("Task Read Test Suite", () => {
  test("should read tasks of length zero", () => {
    return request(app)
      .get("/api/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(0);
      });
  });

  test("should read tasks of length one", async () => {
    await TaskModel.create({
      title: "Test Task",
      description: "This is a test task.",
    });
    return request(app)
      .get("/api/tasks")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);
      });
  });
});
