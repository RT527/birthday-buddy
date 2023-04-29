import mongoose from "mongoose"

const Schema = mongoose.Schema

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
  gifts: [{type: Schema.Types.ObjectId, ref:'Gift'}]
})

const Birthday = mongoose.model('Birthday', birthdaySchema)


export {
  Birthday,
}