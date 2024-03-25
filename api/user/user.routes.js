const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser , validateResetToken} = require('./user.controller'); // Import new functions
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',  updateUser)
router.get('/validate-reset-token/:token', validateResetToken);

// router.put('/:id',  requireAuth, updateUser)
// router.delete('/:id',  requireAuth, requireAdmin, deleteUser)
router.delete('/:id', deleteUser)

module.exports = router