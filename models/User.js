const mongoose = require("mongoose");
const passporteLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

userSchema.plugin(passporteLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("User", userSchema);
