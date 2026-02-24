const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    wallet: { type: String, required: true, index: true },
    courseId: { type: Number, required: true, index: true },
    txHash: { type: String, default: "" }
  },
  { timestamps: true }
);

EnrollmentSchema.index({ wallet: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", EnrollmentSchema);