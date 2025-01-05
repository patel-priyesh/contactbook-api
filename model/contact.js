let mongoose = require("mongoose")
let Schema = mongoose.Schema

let contactdata = new Schema({
    name: { type: String, required: [true, "name is required. please enter name...!"], trim: true, unique: true, },
    phone: { type: String, required: [true, "phone is required. please enter phonenumber...!"], trim: true, },
    email: { type: String, required: [true, "email is required. please enter email...!"], trim: true, },
    address: { type: String, required: [true, "address is required. please enter Address..!"], trim: true, },
    userID:{ type: mongoose.Schema.Types.ObjectId , ref : 'user'}
})
let contact = mongoose.model("contact", contactdata);
module.exports = contact;