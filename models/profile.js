import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  avatar: { 
    type: String,
    required: true
  },
  birthdays: [{
    type: Schema.Types.ObjectId,
    ref: 'Birthday'
  }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}