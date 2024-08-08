import dotenv from "dotenv";
import app from "./app.js";
import connectToMongoDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
