const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: '123risada@gmail.com',
    subject: 'Welcome to the task manager app',
    text: `Welcome, ${name}. I hope you enjoy the application.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: '123risada@gmail.com',
    subject: 'Sad to see you go',
    text: `Goodbye, ${name}. I hope to see you soon.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};
