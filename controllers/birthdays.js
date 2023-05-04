import { Birthday } from "../models/birthday.js"
import { Gift } from "../models/gift.js"
import { Profile } from "../models/profile.js"

const index = async (req, res) => {
  try {
    const title = "Title"
    const birthdays = await Birthday.find({ profile: req.user.profile._id })
    res.render('birthdays/index', {
      birthdays,
      currentDate: new Date(),
      title
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const update = async (req, res) => {
  try {
    const birthday = await Birthday.findOne({ _id: req.params.birthdayId, profile: req.user.profile._id })
    if (!birthday) throw new Error('You are not authorized to edit this birthday.')
    const updateData = req.body
    const options = { new: true }
    const updatedBirthday = await Birthday.findByIdAndUpdate(req.params.birthdayId, updateData, options)
    res.redirect('/birthdays/' + updatedBirthday._id)
  } catch (err) {
    console.log('Error updating birthday:', err)
    res.redirect('/birthdays/' + req.params.birthdayId + '/edit')
  }
}

const newBirthday = async (req, res) => {
  res.render('birthdays/new', { title: 'Add New birthday' })
}

const create = async (req, res) => {
  try {
    const newBirthdayData = { ...req.body, profile: req.user.profile._id }
    const birthday = await Birthday.create(newBirthdayData)
    res.redirect('/birthdays')
  } catch (err) {
    console.log('Error creating birthday:', err)
    res.redirect('/birthdays/new')
  }
}

const show = async (req, res) => {
  try {
    const birthday = await Birthday.findOne({ _id: req.params.birthdayId, profile: req.user.profile._id }).populate('gifts')
    if (!birthday) throw new Error('You are not authorized to view this birthday.')
    const someGifts = await Gift.find({ _id: { $nin: birthday.gifts } })
    res.render('birthdays/show', {
      birthday,
      title: 'Birthday Info',
      gifts: someGifts
    })
  } catch (err) {
    console.log(err)
  }
}

const edit = async (req, res) => {
  try {
    const birthday = await Birthday.findOne({ _id: req.params.birthdayId, profile: req.user.profile._id }).populate('gifts')
    if (!birthday) throw new Error('You are not authorized to edit this birthday.')
    res.render('birthdays/edit', {
      birthday,
      title: 'Edit your birthday'
    })
  } catch (err) {
    console.log(err)
    return res.redirect('/birthdays')
  }
}

const deleteBirthday = async (req, res) => {
  try {
    const deleted = await Birthday.findOneAndRemove({ _id: req.params.birthdayId, profile: req.user.profile._id })
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

const addGift = async (req, res) => {
  try {
    const birthday = await Birthday.findOne({ _id: req.params.birthdayId})
    if (!birthday) {
      return res.render('error', { title: 'Error', message: 'Birthday not found', error:{status:403, stack: 'fix'} })
    }
    if (!req.user) {
      return res.render('error', { title: 'Error', message: 'You must be logged in to add gifts', error:{status:403, stack: 'fix'} })
    }
    birthday.gifts.push(req.body.giftId)
    await birthday.save()
    res.redirect('/birthdays/' + birthday._id)
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

