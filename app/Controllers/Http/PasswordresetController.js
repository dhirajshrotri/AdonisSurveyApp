'use strict'

const {validator, validate} = use('Validator')
//const Mail = use('Mail')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')
const PasswordReset = use('App/Models/PasswordReset')
const randomString = require('random-string')
class PasswordresetController {
    async sendResetLink({request, session, response}){
        //console.log('reset pass route hit')
        const tokenExpire = Date.now() + 360000
        //console.log(tokenExpire)
        const validation = await validate(request.only('email'),{
            email: 'required|email'
        })
        
        const headers = request.headers()
        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            // console.log('validation failed')
            return response.redirect('back')
        }
        
        const user = await User.findBy('email', request.input('email'))
        //console.log(user)
        if(user){
            // const {token} = await PasswordReset.create({
            //     email: user.email,
            //     token: randomString({length:40})
            // })
            //console.log('user found')
            const passreset = new PasswordReset()
            passreset.email = user.email,
            passreset.token = randomString({length:40})
            passreset.tokenExpire = tokenExpire

            await user.PasswordReset().save(passreset)
            const msg = {
                to: user.email,
                from: 'noreply@surveyor.com',
                subject: 'Password reset request.',
                html: '<p> You have requested to reset the password of your account. You can do so by clicking on the link below:</p>'+
                        '<p>http://'+headers.host+'/recoverPassword/'+passreset.token+'</p>'
            }
            sgMail.send(msg)
            session.flash({
                type:'success', 
                notification: `We have sent a mail to your email address to reset your password.`, 
          })
            return response.redirect('/recoverPassword')
        }else{
            session.flash({
                notification:'Sorry, there is no user with this email address.'
            })
        }
    }

    async resetPass({request, params:{token}, response, session, view}){
        const passreset = await Database.from('password_resets').where({'token': token})
        if (passreset.length < 1 || passreset == undefined ){
            session.flash({
                notification: 'This link has already been used. Please try again with a different link.'
            })
            return response.redirect('/login')    
        }
        else{
            const id = passreset[0].user_id
            const user = await Database.from('users').where({'id': id})
            const expire = Date.now()
            if(passreset[0].tokenExpire >= expire){
                return view.render('recoverpassword', {   
                    user: user
                })
            }else{
                session.flash({
                    notification:'Sorry, this token has expired. Please try again.!'
                })
                return response.redirect('/login')
            }
        }
             
    }

    async setPassword({session, params:{id}, request, response}){
        
        const user = await User.find(id)
        const newPass = request.input('newPass')
        const confirmPass = request.input('confirmPass')
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
        await Database.from('password_resets').where({'user_id': user.id}).delete()
        if(newPass === confirmPass){
            if(re.test(newPass)){
                const verify = await Hash.verify(newPass, user.password)
                if(verify){
                    session.flash({
                        type: 'success',
                        notification: 'New password cannot be similar to old password!'
                    })
                    return response.redirect('back')
                }else{
                    const tempPass = await Hash.make(newPass)
                    await User.query().where('id', user.id).update({'password': tempPass})
                    session.flash({
                        type: 'success',
                        notification: 'Password Changed Successfully. Login again to continue.'
                    })
                    return response.redirect('/users/'+user.id+'/logout')
                }
            }else{
                session.flash({
                    type: 'success',
                    notification: 'The selected password must contain a Capital letter, a numeral and must be atleast six chracters long.'
                })
                return response.redirect('back')
            }
        }else{
            session.flash({notification: 'New Password must match with Confirm Password'})
            return response.redirect('back')
        }
    }
}

module.exports = PasswordresetController
