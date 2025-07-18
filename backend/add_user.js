const mongoose = require('mongoose');
const User = require('./model_schema/User');

// 1. Connect to DB
mongoose.connect("mongodb://localhost:27017/assign", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("Connected to MongoDB");

  // 2. Create the user
  const user = new User({
    email: 'cro@example.com',
    password: 'admin123',
    role: 'cro'
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
