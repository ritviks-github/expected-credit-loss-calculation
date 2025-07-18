const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/assign").then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Cannot connect to DB");
})