const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

/**
 * GET /api/enrollments/check?wallet=...&courseId=...
 * MUST be declared BEFORE /:wallet to avoid route conflict
 */
router.get("/check", async (req, res) => {
    try {
        const { wallet, courseId } = req.query

        if (!wallet || !courseId) {
            return res.status(400).json({ error: "BAD_REQUEST", message: "Missing wallet or courseId" })
        }

        const enrollment = await Enrollment.findOne({
            wallet: { $regex: new RegExp(`^${wallet}$`, 'i') },
            courseId: courseId
        })

        res.json({ enrolled: !!enrollment })
    } catch (err) {
        res.status(500).json({ error: "SERVER_ERROR", message: err.message })
    }
})

/**
 * GET /api/enrollments/:wallet
 * Get all course IDs owned by a specific wallet
 */
router.get("/:wallet", async (req, res) => {
    try {
        const { wallet } = req.params;
        if (!wallet) return res.status(400).json({ error: "BAD_REQUEST", message: "Wallet address required" });

        // Lấy danh sách record theo ví
        const enrollments = await Enrollment.find({
            wallet: { $regex: new RegExp(`^${wallet}$`, 'i') }
        }).select('courseId txHash createdAt -_id');

        res.json({ data: enrollments });
    } catch (err) {
        res.status(500).json({ error: "SERVER_ERROR", message: err.message });
    }
})

/**
 * POST /api/enrollments
 * Record a new course purchase
 */
router.post("/", async (req, res) => {
    try {
        const { wallet, courseId, txHash } = req.body;

        if (!wallet || courseId === undefined) {
            return res.status(400).json({ error: "BAD_REQUEST", message: "Missing wallet or courseId" });
        }

        const newEnrollment = new Enrollment({
            wallet,
            courseId,
            txHash: txHash || ""
        });

        await newEnrollment.save();
        res.status(201).json({ data: "Enrollment saved successfully" });
    } catch (err) {
        // 11000 is MongoDB's duplicate key error
        if (err.code === 11000) {
            return res.status(409).json({ error: "CONFLICT", message: "User already enrolled in this course" });
        }
        res.status(500).json({ error: "SERVER_ERROR", message: err.message });
    }
});

module.exports = router;
