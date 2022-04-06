import mongoose from 'mongoose'

const phoneSchema = new mongoose.Schema({
    phone: String,
    token: String,
    isAuth: false
})

export const Phone = mongoose.model("Phone", phoneSchema)