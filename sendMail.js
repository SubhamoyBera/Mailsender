const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    auth: {
        user: process.env.USER, // Your Gmail email address from .env
        pass: process.env.PASSWORD  // Your Gmail password from .env
    }
});

// Define a route for sending emails
app.get('/send-email', (req, res) => {
    // Email content
    const mailOptions = {
        from: process.env.USER,
        to: 'subhab693@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent from Node.js using Gmail and nodemailer!'
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error occurred:', error.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent successfully!', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
