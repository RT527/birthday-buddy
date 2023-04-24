import { Birthday } from "../models/birthday.js"

function index(req, res) {
  const title = "Title"
  birthday.find({})
    .then(birthdays => {
      console.log(birthdays)
      res.render('birthdays/index', {
        birthdays,
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
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  res.send('Update worked')
}

function newbirthday (req,res) {
  res.render('birthdays/new', { title: 'Add New birthday' });
}

function create(req, res) {
  let newbirthdayData = req.body
  birthday.create(newbirthdayData)
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
    const birthday = await birthday.findById(req.params.birthdayId)
    .populate('meals')
    const someMeals = await Meal.find({_id: {$nin: birthday.meals}})
    res.render('birthdays/show', {
      birthday,
      title: `birthday Info`,
      meals: someMeals
    })
  } catch (err) {
    console.log(err)
  }
}

const edit = async (req, res) => {
  try {
    const birthday = await birthday.findById(req.params.birthdayId)
    res.render('birthdays/edit', {
      birthday,
      title: 'Edit your birthday'
    })
  } catch (err) {
    console.log(err)
    return res.redirect('/birthdays')
  }
}


async function deletebirthday(req, res) {
  try {
    const deleted = await birthday.findByIdAndRemove(req.params.birthdayId)
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




export {
  newbirthday as new,
  index,
  deletebirthday as delete,
  show,
  update,
  edit,
  create
}

Birthday