import mongoose from "mongoose"

const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
})

const Gift = mongoose.model('Gift', giftSchema)

export {
  Gift
}