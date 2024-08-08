import { GoogleGenerativeAI } from "@google/generative-ai";
import Store from "../models/store.model.js";
import extractKeywords from "../utils/extractKeywords.js";

Store.createIndexes({ query: 1 });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const handleQuery = async (req, res) => {
  const { query } = req.body;

  try {
    const queryKeywords = extractKeywords(query.toLowerCase());
    const prompt = query;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const matchQuery = await Store.findOne(
      { query: { $all: queryKeywords } }, // Optimized with projection and lean
      { _id: 0, query: 1, link: 1 } // Return only necessary fields
    ).lean();

    if (matchQuery) {
      res.json({ response: responseText, link: matchQuery.link });
    } else {
      res.json({ response: responseText, link: null });
    }
  } catch (error) {
    console.error("Error processing query:", error.message);
    res
      .status(500)
      .json({ error: "Error processing query", details: error.message });
  }
};
