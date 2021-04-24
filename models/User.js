const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String, // This field is a string that hold the microsoftId
    required: true,
  },
  displayName: {
    type: String, // This field as a string type and holds the user's name
    required: true,
  },
});
// Here we are creating a model using the UserSchema with the name 'User'
module.exports = mongoose.model("User", UserSchema);
