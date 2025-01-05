let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String, required: [true,"firstname is required. please enter firstname...!"],trim:true,},
    lastname: {
        type: String, required: [true,"lastname is required. please enter lastname...!"],trim:true,},
    email: {
        type: String, required: [true,"email is required. please enter email...!"],trim:true,unique:true,},
    Password: {
        type: String, required: [true,"password is required. please enter password...!"],trim:true,},
    profile: [String],
})

    let USER = mongoose.model("user" , userSchema);
    module.exports = USER;