
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema  = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is necesary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is necessary']
    },
    password: {
        type: String,
        required: [true, 'password is obligatory']
    },
    img:{
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'Role is obligatory'],
        default: 'USER_ROLE',
        enum: validRoles
        
    },
    status: {
        type: Boolean,
        required: [true, 'Status is obligatory'],
        default: true
    },
    google: {
        type: Boolean,
        required: [true, 'google marker is obligatory'],
        default: false
    }
});

userSchema.methods.toJSON = function () {
    let userObject = this.toObject();

    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('User',userSchema);