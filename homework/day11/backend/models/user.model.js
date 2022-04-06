import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    og:{
        title:String,
        image:String,
        description:String
        },
    name: String,
    email: String,
    personal: String,
    prefer: String,
    pwd:String,
    phone:String
 

})

export const User = mongoose.model("User", userSchema)