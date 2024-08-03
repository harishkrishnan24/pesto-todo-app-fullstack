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

describe("Task Delete Test Suite", () => {
  test("should delete task", async () => {
    const task = await TaskModel.create({
      title: "Test Task",
      description: "This is a test task.",
    });

    return request(app)
      .delete("/api/tasks/" + task._id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe(task._id.toString());
      });
  });

  test("should throw bad request when trying to delete invalid task id", async () => {
    const task = await TaskModel.create({
      title: "Test Task",
      description: "This is a test task.",
    });

    await TaskModel.findByIdAndDelete(task._id);

    return request(app)
      .delete("/api/tasks/" + task._id)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
