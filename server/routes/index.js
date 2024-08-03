import express from "express";

import taskRoutes from "./task.route.js";

const router = express.Router();

router.use("/tasks", taskRoutes);

export default router;
