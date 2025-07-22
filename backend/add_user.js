const mongoose = require('mongoose');
const User = require('./model_schema/User');
require('dotenv').config();  // 👈 Add this line at the top of your file


// 1. Connect to DB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("Connected to MongoDB");

  // 2. Create the user
  const user = new User({
    email: 'admin@example.com',
    password: 'admin123',
    role: 'analyst'
  });

  // 3. Save the user
  await user.save();
  console.log("User created");

  // 4. Close the connection
  await mongoose.disconnect();
})
.catch((err) => {
  console.error("DB connection error:", err.message);
});
