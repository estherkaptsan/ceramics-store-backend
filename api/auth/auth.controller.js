const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
  // const { userCred } = req.body
  const { username, password } = req.body
  console.log(username, password, 'auth controller - username and password');
  try {
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)
    logger.info('User login: ', user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
  } catch (err) {
    logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    const credentials = req.body
    console.log('credentials', credentials)
    // Never log passwords
    // logger.debug(credentials)
    const account = await authService.signup(credentials)
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(credentials.username, credentials.password)
    logger.info('User signup:', user)
    const loginToken = authService.getLoginToken(user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req, res) {
  try {
    res.clearCookie('loginToken')
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}

async function sendPasswordResetEmail(req, res) {
  const { email } = req.body;

  console.log('email', email)
  try {
    await authService.sendPasswordResetEmail(email);
    res.json({ message: 'Password reset email sent successfully' });
  } catch (err) {
    logger.error('Failed to send password reset email', err);
    res.status(500).json({ error: 'Failed to send password reset email' });
  }
}

async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  console.log('token and new password', newPassword)
  try {
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    logger.error('Failed to reset password', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

module.exports = {
  login,
  signup,
  logout,
  sendPasswordResetEmail,
  resetPassword
}