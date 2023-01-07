const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // var connectString = process.env.MONGO_URI;
    var connectString = "mongodb://localhost:27017/MERN-TodoApp";

    const conn = await mongoose.connect(connectString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}`.magenta.underline.dim
    );
  } catch (err) {
    console.log(
      `Error connecting to MongoDB: ${err.message}`.red.underline.bold
    );
    process.exit(1);
  }
};

module.exports = connectDB;
