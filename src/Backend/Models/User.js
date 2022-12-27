const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
    },

    pass: {
        type: String,
    },
})

const Usuario = mongoose.model('User', UserSchema);
module.exports = Usuario