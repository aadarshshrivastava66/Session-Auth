const mongoose = require("mongoose");


const passportLocalMongoose = require('passport-local-mongoose').default;


const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    role: {
        type: String,
        default: "user"
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
