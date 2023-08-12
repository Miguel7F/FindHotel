const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nit: {
        type: Number,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    image: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    age: Number,
    gender: String,
    phone: Number,
    address: String,
    rol: {
        type: Number,
        default: 2
    },
    isActive: {
        type: Boolean,
        default: false
    },
    // createdAt: Date(),
    // updatedAt: Date.now(),
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

