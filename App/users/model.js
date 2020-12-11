const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    age: Number,
    address: String,
    gender: String,
    country: String,
    email: String,
    password: String
}, {
    timestamps: true,
});

module.exports = mongoose.model("Users", User);
