import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    activeEmail: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    activePhone: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'orther'],
        default: 'orther'
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)