const emailService = require('./email.service.js')

const logger = require('../../services/logger.service.js')

async function sendMessageToEmail() {
console.log('sendMessageToEmail');
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log(name, email, message);
    try {
        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'estherkaptsan@gmail.com',
                pass: 'jqct llzg wfwm lhkk'
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'estherkaptsan@gmail.com',
            to: 'estherkaptsan@gmail.com',
            subject: 'New Message from Contact Form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        console.log('Message sent: %s', info.messageId);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});
}

module.exports = {
    sendMessageToEmail
}