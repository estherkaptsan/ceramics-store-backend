const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { sendMessageToEmail } = require('./email.controller.js')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)


router.post('/', sendMessageToEmail)


module.exports = router