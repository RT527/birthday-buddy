import mongoose from "mongoose"

const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Gift = mongoose.model('Gift', giftSchema)

export {
  Gift
}