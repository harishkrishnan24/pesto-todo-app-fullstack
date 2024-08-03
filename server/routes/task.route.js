import express from "express";
import { checkSchema, body } from "express-validator";
import { TaskController } from "../controllers/task.controller.js";
import { TaskStatus } from "../constants/taskStatus.js";

const router = express.Router();

// Schema validation for creating a new task
const taskSchema = checkSchema({
  title: {
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: "Title must be between 3 and 50 characters long.",
    },
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "Title is required.",
    },
  },
  description: {
    optional: true,
    isLength: {
      options: { min: 5, max: 150 },
      errorMessage: "Description must be between 5 and 150 characters long.",
    },
    trim: true,
    escape: true,
  },
  status: {
    isIn: {
      options: Object.values(TaskStatus).join(","),
      errorMessage: "Invalid status",
    },
  },
});

router.get("/", TaskController.getTasks);
router.post("/", taskSchema, TaskController.postTask);
router.patch(
  "/:id",
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(TaskStatus))
    .withMessage("Invalid status"),
  TaskController.updateTaskStatus
);
router.delete("/:id", taskSchema, TaskController.deleteTask);

export default router;
