const mongoose = require('mongoose');
const xlsx = require('xlsx');
require('dotenv').config();  // 👈 Add this line at the top of your file


const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('Connected to MongoDB');

  // Load Excel file
  const workbook = xlsx.readFile('./Bank_Personal_Loan_Modelling.xlsx');
  const sheetName = 'Data'; 
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Define schema (flexible for dynamic keys)
  const loanSchema = new mongoose.Schema({}, { strict: false });
  const Loan = mongoose.model('Loan', loanSchema);

  try {
    await Loan.insertMany(jsonData);
    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    mongoose.disconnect();
  }
});
