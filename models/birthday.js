import mongoose from "mongoose"

const Schema = mongoose.Schema

const birthdayShema = new Schema ({
  birthday: {
    type: Date,
    default: function(){
      let newDate = new Date()
      newDate.setFullYear(newDate.getFullYear()+1)
      return newDate
    }
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,

  },
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
  },
  departs: {
    type: Date,
    default: function(){
      let newDate = new Date()
      newDate.setFullYear(newDate.getFullYear()+1)
      return newDate
    }
  },
  tickets: [ticketSchema],
  meals:[{type: Schema.Types.ObjectId, ref:'Meal'}]
}, {
  timestamps: true,
})

const Birthday = mongoose.model('Birthday', birthdaySchema)

export {
  Birthday
}