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

describe("Task Update Test Suite", () => {
  test("should update task status to completed from pending", async () => {
    const task = await TaskModel.create({
      title: "Test Task",
      description: "This is a test task.",
    });

    return request(app)
      .patch("/api/tasks/" + task._id)
      .send({ status: "completed" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(task._id.toString());
        expect(res.body.status).toBe("completed");
      });
  });

  test("should task status of unknown value is sent throws a bad request error", async () => {
    const task = await TaskModel.create({
      title: "Test Task",
      description: "This is a test task.",
    });

    return request(app)
      .patch("/api/tasks/" + task._id)
      .send({ status: "completedss" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
