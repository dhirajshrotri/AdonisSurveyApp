// 'use strict'
// const sg = require('@sendgrid/mail')
// var helper = require('@sendgrid/mail').mail
// const async = require('async');
// class SendMailController {
//     async sendMail(
//         parentCallback,
//         fromEmail,
//         toEmails,
//         subject,
//         textContent,
//         htmlContent
//     ){
//         const errorMails = []
//         const successfulEmails = []
        
//         sg.setApiKey(process.env.SENDGRID_API_KEY)

//         async.parallel([
//             function(callback){
//                 //Add to Emails
//                 for (let i = 0; i < toEmails.length; i++) {
//                     const senderEmail = new helper.Email(fromEmail)
//                     const toEmail = new helper.Email(toEmails[i])
//                     const content = new helper.Content('text/html', 
//                     htmlContent)
//                     const Mail = new helper.Mail(senderEmail, subject, toEmail, content)

//                     var request = sg.emptyRequest({
//                         method: 'POST',
//                         path: '/v3/mail/send',
//                         body: mail.toJSON()
//                     })

//                     sg.API(request, function(error, response){
//                         console.log('SendGrid')
//                         if (error) {
//                             console.log('Error response received')
//                         }
//                         console.log(response.statusCode)
//                         console.log(response.body);
//                         console.log(response.headers);

//                     })
//                 }

//                 callback(null, true)
//             }
//         ], function(err, results){
//             console.log('Done')
//         })
//         parentCallback(null, {
//             successfulEmails: successfulEmails,
//             errorEmails: errorEmails
//         })
//     }
// }

// module.exports = SendMailController
