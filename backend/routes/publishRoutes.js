import express from "express";
import { handlePublish } from "../controllers/publishController.js";

const router = express.Router();

router.post("/publish", handlePublish);

export default router;
