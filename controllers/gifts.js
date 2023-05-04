import { Gift } from "../models/gift.js"
//========================================================//

const newGift = async (req, res) => {
  try {
    const gifts = await Gift.find({profile: req.user.profile._id })
    res.render('gifts/new', {
      title: 'Add gift',
      gifts
    })
  } catch (err) {
    console.log('Error fetching gifts:', err)
    res.redirect('/gifts/new')
  }
}

const create = async (req, res) => {
  try {
    req.body.profile = req.user.profile._id 
    await Gift.create(req.body)
    res.redirect('/gifts/new')
  } catch (err) {
    console.log(err)
    res.redirect('/gifts/new')
  }
}

const remove = async (req, res) => {
  try {
    req.body.profile = req.user.profile._id 
    const gift = await Gift.findByIdAndDelete(req.params.giftId)
    res.redirect('/gifts/new')
  } catch (err) {
    console.log('Error deleting gift:', err)
    res.redirect('/gifts/new')
  }
}


export {
  newGift as gift,
  create,
  remove
}