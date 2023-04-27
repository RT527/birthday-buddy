import { Router } from 'express'
import * as birthdayCtrl from '../controllers/birthdays.js'

const router = Router()

// GET localhost:3000/users
router.get('/', birthdayCtrl.index)

export { router }
