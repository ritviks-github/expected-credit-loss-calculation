const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadedBy: String, // email or analyst ID
  role: String, // Analyst or CRO
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);
