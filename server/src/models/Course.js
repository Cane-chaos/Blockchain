const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },

    slug: { type: String, required: true },

    title: { type: String, required: true },

    price: { type: String, required: true },

    image: { type: String, default: "" },

    previewVideo: { type: String, default: "" },

    level: { type: String, default: "" },

    duration: { type: String, default: "" },

    skills: [String],

    about: {
      description: String,
      learning: [String]
    },

    curriculum: [
      {
        title: String,
        lessons: [String]
      }
    ],

    reviews: [
      {
        user: String,
        rating: Number,
        comment: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);