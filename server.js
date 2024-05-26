const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}
// ----------------------------------------------------------------
// app.post('/api/contact', async (req, res) => {
//     const { name, email, message } = req.body;
//     console.log(name, email, message);
//     try {
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'estherkaptsan@gmail.com',
//                 pass: 'jqct llzg wfwm lhkk'
//             }
//         });

//         let info = await transporter.sendMail({
//             from: 'estherkaptsan@gmail.com',
//             to: 'estherkaptsan@gmail.com',
//             subject: 'New Message from Contact Form',
//             text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//         });

//         console.log('Message sent: %s', info.messageId);
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// });
// ----------------------------------------------------------------

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const itemRoutes = require('./api/item/item.routes')
// const emailRoutes = require('./api/email/email.routes')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/item', itemRoutes)
// app.use('/api/contact', emailRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/item/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3000
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})