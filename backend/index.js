const express = require('express');
const app = express();
const cors = require('cors');
const chatRoutes = require('./routes/chat');
require('./db');
require("dotenv").config();





app.use(express.json());
app.use(cors());



app.use('/uploads', express.static('uploads'));
app.use('/api',require('./routes/login_route'));
app.use('/api',require('./routes/fetch_loans'));
app.use('/api',require("./routes/ask_ai"));
app.use('/api/messages', chatRoutes);
app.use('/api', require('./routes/reports'));

const port = process.env.PORT || 8080;


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})