import mongoose from 'mongoose'

const tokenSchmea = new mongoose.Schema({
    phone: String,
    token: String,
    isAuth: false
})

export const Token = mongoose.model("Token", tokenSchmea)