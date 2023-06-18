const mongoose = require("mongoose");
const { db_URL } = require("./db.config");
const connectDB = async () => {
    
  try {
    const conn = await mongoose.connect(db_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;