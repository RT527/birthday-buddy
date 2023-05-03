import { Router } from 'express'
import * as birthdayCtrl from '../controllers/birthdays.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/users
router.get('/', isLoggedIn, birthdayCtrl.index)

// GET localhost:3000/birthdays/new
router.get('/new', isLoggedIn, birthdayCtrl.new)

// GET localhost:3000/birthdays/:birthdayId
router.get('/:birthdayId', isLoggedIn, birthdayCtrl.show)

// GET localhost:3000/birthdays/:birthdayId/edit
router.get('/:birthdayId/edit', isLoggedIn, birthdayCtrl.edit)

// POST localhost:3000/birthdays
router.post('/', isLoggedIn, birthdayCtrl.create);

router.post('/:birthdayId/gifts', isLoggedIn, birthdayCtrl.addGift)


// DELETE localhost:3000/birthdays/:birthdayId
router.delete('/:birthdayId', isLoggedIn, birthdayCtrl.delete)


// PUT localhost:3000/birthdays/:birthdayId
router.put('/:birthdayId', isLoggedIn, birthdayCtrl.update)

export { router }
