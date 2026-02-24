const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

/**
 * POST /api/user/enroll
 * body: { wallet, courseId, txHash? }
 */
router.post("/enroll", async (req, res) => {
  try {
    const { wallet, courseId, txHash = "" } = req.body || {};
    if (!wallet || typeof wallet !== "string") {
      return res.status(400).json({ error: "BAD_WALLET", message: "wallet is required" });
    }
    const cId = Number(courseId);
    if (Number.isNaN(cId)) {
      return res.status(400).json({ error: "BAD_COURSE_ID", message: "courseId must be a number" });
    }

    const doc = await Enrollment.findOneAndUpdate(
      { wallet: wallet.toLowerCase(), courseId: cId },
      { $set: { txHash } },
      { upsert: true, new: true }
    );

    res.json({ ok: true, data: { wallet: doc.wallet, courseId: doc.courseId, txHash: doc.txHash } });
  } catch (err) {
    // duplicate key => đã enroll rồi
    if (String(err.message || "").includes("E11000")) {
      return res.json({ ok: true, duplicated: true });
    }
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
});

/**
 * GET /api/user/enrollments?wallet=0x...
 */
router.get("/enrollments", async (req, res) => {
  try {
    const wallet = String(req.query.wallet || "").toLowerCase();
    if (!wallet) return res.status(400).json({ error: "BAD_WALLET", message: "wallet is required" });

    const enrolls = await Enrollment.find({ wallet }, { _id: 0, __v: 0 }).sort({ courseId: 1 });
    res.json({ data: enrolls });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
});

module.exports = router;