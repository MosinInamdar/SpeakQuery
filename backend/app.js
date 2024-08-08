import express from "express";
import cors from "cors";
import queryRoutes from "./routes/queryRoutes.js";
import publishRoutes from "./routes/publishRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", queryRoutes);
app.use("/api", publishRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the AI-powered Assistant");
});

export default app;
