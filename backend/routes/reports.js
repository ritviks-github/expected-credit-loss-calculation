const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Report = require('../model_schema/Report');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/reports');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/upload-report
router.post('/upload-report', upload.single('report'), async (req, res) => {
  const { uploadedBy, role } = req.body;

  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  const report = new Report({
    filename: req.file.filename,
    originalname: req.file.originalname,
    uploadedBy,
    role
  });

  await report.save();
  res.status(200).json({ message: 'Report uploaded successfully.' });
});

// GET /api/reports
router.get('/reports', async (req, res) => {
  const reports = await Report.find().sort({ uploadDate: -1 });
  res.json(reports);
});

// GET /api/download/:filename
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, `../uploads/reports/${req.params.filename}`);
  res.download(filePath);
});

module.exports = router;
