import { Router } from 'express'

import * as giftsCtrl from '../controllers/gifts.js'

const router = Router()

// GET 
router.get('/item', giftsCtrl.gift)

// POST 
router.post('/', giftsCtrl.create)

// DELETE
router.delete('/:giftId', giftsCtrl.remove)

export { router }