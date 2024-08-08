import { GoogleGenerativeAI } from "@google/generative-ai";
import Store from "../models/store.model.js";
import extractKeywords from "../utils/extractKeywords.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const handleQuery = async (req, res) => {
  const { query } = req.body;

  try {
    const queryKeywords = extractKeywords(query.toLowerCase());
    const matchQuery = await Store.findOne({ query: { $all: queryKeywords } });

    if (matchQuery) {
      const prompt = query;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      res.json({ response: responseText, link: matchQuery.link });
    } else {
      const prompt = query;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      res.json({ response: responseText, link: null });
    }
  } catch (error) {
    console.error("Error processing query:", error.message);
    res
      .status(500)
      .json({ error: "Error processing query", details: error.message });
  }
};
