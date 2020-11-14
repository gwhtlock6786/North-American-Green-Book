const mongoose = require("mongoose");

let championSchema = new mongoose.Schema({
    name: String,
    profession: String,
    professionalTitle: String,
    image: String,
    details: String,
    email: String,
    phone: String,
    author: {

        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
  
      }

});

module.exports = mongoose.model("Champion", championSchema);