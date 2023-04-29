import { Router } from 'express'
import * as birthdayCtrl from '../controllers/birthdays.js'

const router = Router()

// GET localhost:3000/users
router.get('/', birthdayCtrl.index)

// GET localhost:3000/birthdays/new
router.get('/new', birthdayCtrl.new)

// GET localhost:3000/birthdays/:birthdayId
router.get('/:birthdayId', birthdayCtrl.show)

// GET localhost:3000/birthdays/:birthdayId/edit
router.get('/:birthdayId/edit', birthdayCtrl.edit)

// POST localhost:3000/birthdays
router.post('/', birthdayCtrl.create);

router.post('/:birthdayId/gifts', birthdayCtrl.addGift)


// DELETE localhost:3000/birthdays/:birthdayId
router.delete('/:birthdayId', birthdayCtrl.delete)


// PUT localhost:3000/birthdays/:birthdayId
router.put('/:birthdayId', birthdayCtrl.update)

export { router }
