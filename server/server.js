import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("TaskDuty backend is running!");
});

app.listen(PORT, () => {
  console.log(`TaskDuty server running on port ${PORT}`);
});
