import mongoose from "mongoose";
import { TaskStatus } from "../constants/taskStatus.js";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, minLength: 5, maxLength: 150 },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

const TaskModel =
  mongoose.models.TaskModel || mongoose.model("TaskModel", taskSchema);

export default TaskModel;
