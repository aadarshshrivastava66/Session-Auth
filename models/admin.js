const mongoose = require("mongoose");

// Same safe fix here also 👇
const passportLocalMongoose = require('passport-local-mongoose').default;



const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
    role: {
        type: String,
        default: "admin"
    }
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);
