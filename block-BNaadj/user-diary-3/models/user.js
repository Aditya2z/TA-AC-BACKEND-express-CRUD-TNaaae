var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, match: /@/},
    age: {type: Number, default: 18},
    address: {type: String},
    bio: {type: String},
    hobbies: [String]
})

module.exports = mongoose.model("User", userSchema);