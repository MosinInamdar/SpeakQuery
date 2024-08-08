import axios from "axios";
import Store from "../models/store.model.js";
import extractKeywords from "../utils/extractKeywords.js";

export const handlePublish = async (req, res) => {
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

    const store = new Store({ query: keywords, link: articleUrl });
    await store.save();

    res.json({ message: "Published successfully", link: articleUrl });
  } catch (error) {
    console.error("Error publishing to dev.to:", error.message);
    res
      .status(500)
      .json({ error: "Error publishing to dev.to", details: error.message });
  }
};
