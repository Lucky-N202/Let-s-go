require("dotenv").config();
const mongoose = require("mongoose");

let db_connection = `mongodb+srv://${process.env.HOST}:${process.env.PASSWORD_DB}@cluster1.ekiux.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;



async function connectToDatabase() {
  try {
    await mongoose.connect(db_connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
 


module.exports = connectToDatabase();
