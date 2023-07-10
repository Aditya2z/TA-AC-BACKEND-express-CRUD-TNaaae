var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, match: /@/}
})

module.exports = mongoose.model("Student", studentSchema);