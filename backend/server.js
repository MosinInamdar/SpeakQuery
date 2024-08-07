import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  try {
    const prompt = query;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(responseText);

    res.json(responseText);
  } catch (error) {
    console.error(
      "Error processing query:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error processing query",
      details: error.response ? error.response.data : error.message,
    });
  }
});

app.post("/api/publish", async (req, res) => {
  const { response } = req.body;

  const devToApiUrl = "https://dev.to/api/articles";
  const devToApiKey = process.env.DEV_TO_API_KEY;

  const articleData = {
    article: {
      title: "Generated Content",
      published: false,
      body_markdown: response,
    },
  };

  try {
    const result = await axios.post(devToApiUrl, articleData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": devToApiKey,
      },
    });

    res.json(result.data);
  } catch (error) {
    console.error(
      "Error publishing to dev.to:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Error publishing to dev.to",
      details: error.response ? error.response.data : error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
