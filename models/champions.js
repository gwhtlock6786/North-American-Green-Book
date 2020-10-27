const mongoose = require("mongoose");

let championSchema = new mongoose.Schema({
    name: String,
    profession: String,
    professionalTitle: String,
    image: String,
    details: String
});

module.exports = mongoose.model("Champion", championSchema);