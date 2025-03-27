import express from "express";
const app = express.Router();

import tasksRouter from "./routes/tasks.router.js";

app.get("/", (req, res) => res.send("User Running 🚀"));

// Routes
app.use("/tasks", tasksRouter);

export default app;