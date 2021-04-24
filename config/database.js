const mongoose = require("mongoose"); // Require mongoose ODM

const connectDB = async () => {
  // This part is trying to establish a connection with the DB
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      // Gets the DB_STRING  from the environment variables, this keep our private keys out of the GIT repo.
      // Some options (magic!) we should read the documentation.
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // Success connection console log message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Console log error message
    console.error(err);
    // Crash the app if an error
    process.exit(1);
  }
};
// Export the functions when 'connectDB' is called.
module.exports = connectDB;
