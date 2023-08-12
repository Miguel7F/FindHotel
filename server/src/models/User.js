const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    NIT: {
        type: Number,
        unique: true,
        require: true,
    },
    Name: {
        type: String,
        require: true
    },
    LastName: String,
    Email: {
        type: String,
        unique: true,
        require: true
    },
    Password: String,
    Age: Number | null,
    Phone: Number | null,
    Address: String,
    State: Number,
    Codigo: String,
    //Credicards: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard' },
})

const User = mongoose.model('Users', userSchema)