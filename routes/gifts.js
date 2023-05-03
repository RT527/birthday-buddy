import { Router } from 'express'
import * as giftsCtrl from '../controllers/gifts.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

// GET 
router.get('/new', isLoggedIn, giftsCtrl.gift)

// POST 
router.post('/', isLoggedIn, giftsCtrl.create)

// DELETE
router.delete('/:giftId', isLoggedIn, giftsCtrl.remove)

export { router }