import mongoose from "mongoose"

const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: {
    type: String,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true
  },
},{
  timestamps: true,
})

const Gift = mongoose.model('Gift', giftSchema)

export {
  Gift
}