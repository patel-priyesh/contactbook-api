let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let adminSchema = new Schema({
    email: {
        type: String, required: [true,"email is required. please enter email...!"],trim:true,unique:true,},
    Password: {
        type: String, required: [true,"password is required. please enter password...!"],trim:true,},
})

    let ADMIN = mongoose.model("admin" , adminSchema);
    module.exports = ADMIN;