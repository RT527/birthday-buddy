import mongoose from "mongoose"

const Schema = mongoose.Schema

const giftSchema = new Schema ({
  name: String,
  description: String
})

const birthdaySchema = new Schema ({
  birthday : {type: Date, required: true },
  personName : {type: String, required: true},
  notes: String,
  gifts: [giftSchema]
})

const Birthday = mongoose.model('Birthday', birthdaySchema)

export {
  Birthday
}