import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: { type: Number, min: 1, max: 5, default: 5 }
}, {
  timestamps: true
})

const birthday = new Schema({
  
})

const birthday = mongoose.model('birthday', birthdaySchema)

export {
  Birthday
}