import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    query: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
storeSchema.index({ query: 1 });

const Store = mongoose.model("Store", storeSchema);

export default Store;
