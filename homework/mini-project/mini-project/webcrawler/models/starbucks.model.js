import mongoose from 'mongoose'

const starbucksSchema = new mongoose.Schema({
    name: String,
    image: String
})

export const Starbucks = mongoose.model("Starbucks", starbucksSchema)