const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: { type: String,required: true , unique : true},
    email: { type: String,unique : true, required: true },
    password: { type: String, required: true },
    createdTime: { type: Date, default: new Date().toDateString() },
    updatedTime: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });

let User = mongoose.model('Users',userSchema)

module.exports = User