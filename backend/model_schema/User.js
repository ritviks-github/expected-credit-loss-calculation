const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['analyst', 'cro'],
    default: 'analyst'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});




userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const User = mongoose.model("User",userSchema);

module.exports = User;