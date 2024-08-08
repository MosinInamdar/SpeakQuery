import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import natural from "natural";
import Store from "./models/store.model.js";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import connectToMongoDB from "./db/connectToMongoDB.js";

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to extract keywords using natural library
const extractKeywords = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(text);
  const keywords = [];
  tfidf.listTerms(0).forEach((item) => {
    keywords.push(item.term);
  });
  return keywords;
};

// Function to compute similarity score
const computeSimilarity = (keywords1, keywords2) => {
  const intersection = keywords1.filter((word) => keywords2.includes(word));
  return intersection.length / Math.max(keywords1.length, keywords2.length);
};

app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  try {
    // Extract keywords from the query
    const queryKeywords = extractKeywords(query.toLowerCase());

    const matchQuery = await Store.findOne({ query: { $in: queryKeywords } });

    if (matchQuery) {
      const prompt = query;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      res.json({ response: responseText, link: matchQuery.link });
    } else {
      // Generate new content if no similar response is found
      const prompt = query;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      res.json({ response: responseText, link: null });

      // Do not save the new query here, only return the response
    }
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
  const { query, response } = req.body;

  const devToApiUrl = "https://dev.to/api/articles";
  const devToApiKey = process.env.DEV_TO_API_KEY;

  const articleData = {
    article: {
      title: query,
      published: true,
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

    const articleUrl = result.data.url;
    const keywords = extractKeywords(query.toLowerCase());

    // Store the query and link in the Store Mongodb
    const store = new Store({ query: keywords, link: articleUrl });
    await store.save();

    res.json({ message: "Published successfully", link: articleUrl });
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
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
