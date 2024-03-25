const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const filterBy = {

            txt: req.query?.txt || '',
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        console.log(user, 'before saved');
        const savedUser = await userService.update(user)
        console.log(savedUser, 'after saved');
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function validateResetToken(req, res) {
    console.log('token from user controller', req.params.token)
    const { token } = req.params;
    console.log('token from user controller', token)

    try {
        // Check if the token is valid and hasn't expired
        // You can implement your token validation logic here
        // For example, you can query the database to find a user with the provided token
        // and check if the token is valid and hasn't expired
        // If valid, you can send a success response
        // If invalid, you can send an error response

        // Replace the following code with your actual token validation logic

        // Example: Find a user with the provided token
        const user = await userService.getByResetToken(token);

        if (!user || user.passwordResetExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Token is valid, send a success response
        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        console.error('Error validating reset token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    validateResetToken

}