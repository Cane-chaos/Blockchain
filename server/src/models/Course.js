const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // map với smart contract
    title: { type: String, required: true },
    price: { type: String, required: true }, // ETH dạng string, ví dụ "0.01"
    image: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    nftImage: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);