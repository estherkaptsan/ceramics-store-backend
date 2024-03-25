const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getItems, getItemById, addItem, updateItem, removeItem  } = require('./item.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getItems)
router.get('/:id', getItemById)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', removeItem)
// router.delete('/:id', requireAuth, requireAdmin, removeItem)

module.exports = router