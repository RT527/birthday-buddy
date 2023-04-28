import mongoose from "mongoose"

const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
})

const birthdaySchema = new Schema({
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value)
      },
      message: 'Invalid date format'
    }
  },
  personName: {
    type: String,
    required: true
  },
  notes: String,
  gifts: [giftSchema]
})

const Birthday = mongoose.model('Birthday', birthdaySchema)
const Gift = mongoose.model('Gift', giftSchema)


export {
  Birthday,
  Gift
}