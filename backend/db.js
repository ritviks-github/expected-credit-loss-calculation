const mongoose = require('mongoose');
require('dotenv').config();  // 👈 Add this line at the top of your file


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Cannot connect to DB");
})