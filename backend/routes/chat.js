const express = require('express');
const router = express.Router();
const Message = require('../model_schema/Message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // ascending
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST a new message
router.post('/', async (req, res) => {
  const { sender, message } = req.body;
  try {
    const newMessage = new Message({ sender, message });
    await newMessage.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
