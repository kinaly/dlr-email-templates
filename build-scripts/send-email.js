const mailgun = require('mailgun-js');
const emailData = require('./email-data.json');

const email = emailData.to;
const template = emailData.template;
const subject = `Testing template: ${template}`;

const messageData = {
    from: emailData.from || 'test@interxion.com',
    to: email,
    subject,
    template,
    'h:X-Mailgun-Variables': JSON.stringify(emailData.data)
};

const DOMAIN = emailData.domain;
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY || emailData.api_key, domain: DOMAIN });
mg.messages().send(messageData, function (error, body) {
    console.log(body);
});
