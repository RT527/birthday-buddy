import { Profile } from "../models/profile.js"
//========================================================//


const index = async (req, res) => {
  try {
    const profiles = await Profile.find({})
    const userProfile = await Profile.findById(req.user.profile)
    res.render('profiles/index', {
      profiles,
      userProfile
    })
  } catch (err) {
    console.log(err)
    res.redirect('/profiles')
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    res.render('profiles/show', {
      profile
    })
  } catch (err) {
    console.log(err)
    res.redirect('/profiles')
  }
}

export {
  index,
  show
}