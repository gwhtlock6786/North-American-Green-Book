const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");


//Schema Setup
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    email: String,
    phone: String,
    name: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

