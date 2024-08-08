import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
