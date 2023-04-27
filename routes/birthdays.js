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

export { router }
