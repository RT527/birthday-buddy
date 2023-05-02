import { Birthday } from "../models/birthday.js"
import { Gift } from "../models/gift.js"
//========================================================//

function index(req, res) {
  const title = "Title"
  Birthday.find({})
    .then(birthdays => {
      res.render('birthdays/index', {
        birthdays: birthdays,
        currentDate: new Date(),
        title: title
      });
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function update(req, res) {
  const updateData = req.body
  const options = { new: true }
  Birthday.findByIdAndUpdate(req.params.birthdayId, updateData, options)
    .then(birthday => {
      res.redirect('/birthdays/' + birthday._id)
    })
    .catch(err => {
      console.log('Error updating birthday:', err)
      res.redirect('/birthdays/' + req.params.birthdayId + '/edit')
    })
}


function newBirthday (req,res) {
  res.render('birthdays/new', { title: 'Add New birthday' })
}

function create(req, res) {
  let newBirthdayData = req.body
  Birthday.create(newBirthdayData)
  .then(birthday => {
    res.redirect('/birthdays')
  })
  .catch(err => {
    console.log('Error creating birthday:', err)
    res.redirect('/birthdays/new')
  })
}

const show = async (req, res) => {
  try {
    const birthday = await Birthday.findById(req.params.birthdayId)
    const gifts = await Gift.find()
    res.render('birthdays/show', {
      birthday,
      title: `birthday Info`,
      gifts,
    })
  } catch (err) {
    console.log(err)
  }
}


const edit = async (req, res) => {
  try {
    const birthday = await Birthday.findById(req.params.birthdayId).populate('gifts')
    res.render('birthdays/edit', {
      birthday,
      title: 'Edit your birthday'
    })
  } catch (err) {
    console.log(err)
    return res.redirect('/birthdays')
  }
}


async function deleteBirthday(req, res) {
  try {
    const deleted = await Birthday.findByIdAndRemove(req.params.birthdayId)
    if (deleted) {
      res.redirect('/birthdays')
    } else {
      res.render('error', { title: 'Error', message: 'birthday not found', title: 'Error' })
    }
  } catch (err) {
    console.log(err)
    res.redirect('/birthdays')
  }
}

async function addGift(req, res) {
  try {
    const birthday = await Birthday.findById(req.params.birthdayId)
    const giftObjectId = mongoose.Types.ObjectId(req.body.giftId)
    birthday.gifts.push(giftObjectId)
    await birthday.save()
    res.redirect(`/birthdays/${birthday._id}`)
  } catch (err) {
    console.log('Error adding gift to birthday:', err)
    res.redirect('/birthdays')
  }
}

export {
  newBirthday as new,
  index,
  deleteBirthday as delete,
  show,
  update,
  addGift,
  edit,
  create
}

