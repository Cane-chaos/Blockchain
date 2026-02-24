require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

const seedCourses = [
  {
    id: 1,
    title: "Intro to Web3",
    price: "0.01",
    image: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nftImage: "https://placehold.co/600x400?text=Certificate+1"
  },
  {
    id: 2,
    title: "Solidity Basics",
    price: "0.02",
    image: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nftImage: "https://placehold.co/600x400?text=Certificate+2"
  },
  {
    id: 3,
    title: "DApp Integration",
    price: "0.03",
    image: "https://placehold.co/600x400",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nftImage: "https://placehold.co/600x400?text=Certificate+3"
  }
];

(async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  await mongoose.connect(mongoUri);
  await Course.deleteMany({});
  await Course.insertMany(seedCourses);
  console.log("✅ Seeded courses:", seedCourses.length);
  await mongoose.disconnect();
})();