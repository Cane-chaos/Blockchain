const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

/**
 * GET /api/courses
 */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({}, { _id: 0, __v: 0 }).sort({ id: 1 });
    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
});

/**
 * GET /api/courses/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const courseId = Number(req.params.id);
    if (Number.isNaN(courseId)) {
      return res.status(400).json({ error: "BAD_ID", message: "id must be a number" });
    }

    const course = await Course.findOne({ id: courseId }, { _id: 0, __v: 0 });
    if (!course) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Course not found" });
    }

    res.json({ data: course });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
});

/**
 * POST /api/courses
 */
router.post("/", async (req, res) => {
  try {
    const { id, title, price, image, videoUrl, nftImage } = req.body;

    if (id === undefined || !title || !price) {
      return res.status(400).json({ error: "BAD_REQUEST", message: "Missing required fields: id, title, price" });
    }

    const newCourse = new Course({
      id,
      title,
      price,
      image: image || "",
      videoUrl: videoUrl || "",
      nftImage: nftImage || ""
    });

    await newCourse.save();
    res.status(201).json({ data: Object.assign({}, newCourse.toObject(), { _id: undefined, __v: undefined }) });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "CONFLICT", message: "Course ID already exists" });
    }
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
});

module.exports = router;