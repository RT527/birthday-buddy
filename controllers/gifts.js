import { Gift } from "../models/gift.js"

const newGift = async (req, res) => {
  try {
    const gifts = await Gift.find({})
    console.log(gifts, 'Gift')
    res.render('gifts/item', {
      title: 'Add gift',
      gifts
    })
  } catch (err) {
    console.log('Error fetching gifts:', err)
    res.redirect('/gifts/item')
  }
}

const create = async (req, res) => {
  try {
    await Gift.create(req.body)
    res.redirect('/gifts/item')
  } catch (err) {
    console.log(err)
    res.redirect('/gifts/item')
  }
}

const remove = async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.giftId)
    res.redirect('/gifts/item')
  } catch (err) {
    console.log('Error deleting gift:', err)
    res.redirect('/gifts/item')
  }
}


export {
  newGift as gift,
  create,
  remove
}