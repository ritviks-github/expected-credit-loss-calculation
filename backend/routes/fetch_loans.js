const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Reuse existing collection from Compass
const loanSchema = new mongoose.Schema({}, { strict: false });
const Loan = mongoose.model('Loan', loanSchema, 'loans'); // 3rd param is collection name

router.get('/loans', async (req, res) => {
  try {
    const loans = await Loan.find().limit(100); // optional limit
    res.json(loans);
  } catch (err) {
    console.error('Error fetching loans:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
