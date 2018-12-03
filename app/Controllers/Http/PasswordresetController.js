'use strict'

const {validator, validateAll} = use('Validator')
const Mail = use('Mail')
const User = use('App/Models/User')
const Hash = use('Hash')
const PasswordReset = use('App/Models/passwordReset')
const randomString = require('random-string')
class PasswordresetController {
    async sendResetLink({request, session, response}){
        const validation = await validate(request.only('email'),{
            email: 'required|email'
        })
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        try{
            const user = await User.findBy('email', request.input('email'))
            const {token} = await PasswordReset.create({
                email: user.email,
                token: randomString({length:40})
            })

            const mailData = {
                user:user.toJSON(),
                token
            }

            await Mail.send('auth.emails.password_reset', mailData, message => {
                message
                    .to(user.email)
                    .from('hello@surveyor.com')
                    .subject('Password Reset Link')
            })

            session.flash({
                notification:{
                    type: 'success',
                    message: 'A password reset link has been sent to your email'
                }
            })
            return response.redirect('back')
        }catch (error) {
            session.flash({
                notification: {
                  type: 'danger',
                  message: 'Sorry, there is no user with this email address.'
                }
            })
        }
    }
}

module.exports = PasswordresetController
