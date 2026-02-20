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

module.exports = router;