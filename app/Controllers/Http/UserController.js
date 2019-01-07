'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')
const isActive = use('App/Models/IsActive')
const { validate } = use('Validator')
const Database = use('Database')
const randomString = use('random-string')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
class UserController {
    async checkLogin({response, view, auth}){
        try {
            const isLoggedIn = await auth.check()
            if (isLoggedIn) {
               const user = await auth.getUser()
               response.redirect('/users/'+user.id)
            }
        } catch (error) {
            return view.render('signin')
        }
    }

    async login({request, response, auth, session}){
        
        const {email, password, remember} = request.all()
        const user =  await User.query()
                                .where('email', email)
                                .first()
        //console.log(user)
        if(user){
            const isActive = await user.isActive().fetch()
            if(isActive.is_active){
                const passwordVerified = await Hash.verify(password, user.password)
                if(passwordVerified){
                    if(remember){
                        await auth.remember(true).login(user)
                        return response.redirect('/users/'+user.id)
                    }
                    else{
                        await auth.remember(false).login(user)
                        return response.redirect('/users/'+user.id)
                    }
                }
            }
            else{
                session.flash({
                    type:'danger', 
                    notification: `Please confirm your email first!`, 
              })
              return response.redirect('back')
            }
        }
        session.flash({
                type:'success', 
                notification: `We couldn't verify your credentials. Please check your Email and Password!`, 
          })

        return response.redirect('back')
    }

    async redirect({auth, response}){
        const user = await auth.getUser()
        return response.redirect('/users/'+user.id)
    }

    async profile({request, response, auth, view}){
        const user = await auth.getUser()
        //console.log(user)
        const userSurvey = await user.survey().fetch()
        const user_Survey = userSurvey.toJSON()
        if(user){
            //response.ok(user)
            return view.render('dashboard', {
                title: 'Welcome!',
                user: user,
                user_Survey: user_Survey
            })
        }

        response.unauthorised('You must be logged in to see your profile!')
    }

    async store({ request, response, session}){
        // console.log('store hit')
        const rules = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }
        const headers = request.headers()
        const validation = await validate(request.all(), rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
            //console.log('Errors')
        }else{
            // console.log('validation passsed')
            const firstName = request.input('firstName')
            const lastName = request.input('lastName')
            const email = request.input('email')
            const password = request.input('password')
            const confirmPass = request.input('confirmPass')    
            if(confirmPass === password){
                console.log('pass verified')
                const user = new User()
                user.email = email
                user.firstName = firstName
                user.lastName = lastName
                user.password = password
                //console.log('creating user!')
                await user.save()
                const userActive = new isActive()
                userActive.token = randomString({length: 40})
                userActive.token_expire = Date.now() + 86400
                userActive.is_active = false
                await user.isActive().save(userActive)
                const msg = {
                    to: user.email,
                    from: 'noreply@surveyor.com',
                    subject: 'Confirm your email!',
                    html: '<p> Your email has been registered on Surveyor. Please confirm your email by clicking the link below:</p>'+
                        '<p>http://'+headers.host+'/register/confirm/'+userActive.token+'</p>'
                }
                sgMail.send(msg)
                session.flash({ notification: 'We have sent a confirmation mail to your email. Please confirm your email to continue!' })
                return response.redirect('/register/plsConfirm')
            }
            else{
                session.flash({ 
                    type:'success', 
                    notification: "The two passwords must match!" 
                })
                return response.redirect('back')
            }
            
        }
        //console.log('Store route hit!')
    }

    async logout({auth, response}){
        await auth.logout()

        return response.redirect('/login')
    }

    async edit({auth, view}){
        const user = await auth.getUser()
        if(user){
            return view.render('useredit', {
                user: user
            })
        }else{
            response.unauthorised('You must be logged in to see this page!')
        }
    }

    async update({auth, request,response}){
        const user = await auth.getUser()
         
        if(user){
            const {firstName, lastName} = request.all()
            if(!firstName) {
                firstName = user.firstName
              }
              if(!lastName){
                lastName = user.lastName
              }
              await Database.table('users').where('id', user.id).update({ 'firstName': firstName, 'lastName': lastName})
              response.redirect('/users/'+user.id)
        }
    }

    async resetPassword({auth, request, view}){
        const user = await auth.getUser()
        if(user){
            //console.log('Route to reset Password reached!')
            return view.render('resetpassword', {
                user:user
            })
        }else{
            response.unauthorised('You must be logged in to see this page!')
        }
    }

    async modifyPassword({auth, request, response, session}){
        const user = await auth.getUser()
        const {oldPass, newPass, confirmPass} = request.all()
        console.log(oldPass)
        console.log(newPass)
        console.log(confirmPass)
        if(user){
            // console.log('Updating Password!')
            const verifiedPass = await Hash.verify(oldPass, user.password)
            if(verifiedPass){
                if(oldPass === newPass){
                    session.flash({
                        notification: {
                            type: 'danger',
                            message: 'New Password cannot be same as Old Password.'
                        }
                    })
                }else{
                    if(newPass === confirmPass){
                        const tempPass = await Hash.make(newPass)
                        //console.log(tempPass)
                        await User.query().where('id', user.id).update({'password': tempPass})
                        session.flash({
                            notification: {
                                type: 'success',
                                message: 'Password Updated Successfully. Login again to continue.'
                            }
                        })
                        return response.redirect('/users/'+user.id+'/logout')  
                    }
                }

            }
            else{
                session.flash({
                    notification: {
                        type: 'danger',
                        message: `The password you have entered doesn't match. Please re-enter your old password.`
                    }
                })
                return reponse.redirect('back')
            }
        }
        else{
            response.unauthorised('You must be logged in to see this page!')
        }
    }

    async confirmEmail({ params:{token}, session, response}){
        //const is_active = await isActive.find(token)
        const is_active = await Database.from('is_actives').where({ 'token':token })
        //const user = await User.findby('id', is_active)
        const expire = Date.now()
        if(expire > is_active.token_expire){
            session.flash({
                notification:{
                    type: 'danger',
                    message: 'Your token has expired. Please register again.'
                }
            })
            await User.delete().where('id', is_active)  
            return response.redirect('/register')
        }
        else{
            // is_active.token = null 
            // is_active.is_active = true
            //await is_active.save()
            await Database.table('is_actives').where('token', token).update({ 'token': null, 'is_active': true})
            session.flash({
                type:'success', 
                notification: `Your email address has been confirmed. Please log in to continue.`, 
          })
            return response.redirect('/login')
        }
        
    }
    async redirectToProvider ({ally}) {
        await ally.driver('google').redirect()
    }

    async handleProviderCallback ({params, ally, auth, response}) {
        const provider = params.provider
        try {
            const userData = await ally.driver(provider).getUser()
            console.log(userData)
            // const authUser = await User.query().where({
            //     'provider': provider,
            //     'provider_id': userData.getId()
            // }).first()
            // if (!(authUser === null)) {
            //     await auth.loginViaId(authUser.id)
            //     return response.redirect('/')
            // }

            // const user = new User()
            // user.name = userData.getName()
            // user.email = userData.getEmail()

            // await user.save()

            // await auth.loginViaId(user.id)
            // return response.redirect('/')
        } catch (e) {
            console.log(e)
            response.redirect('/auth/' + provider)
        }
    }

    async destroy({params:{id}, request, response}){
        const user = await User.find(id)
        await user.delete()
        return response.redirect('/')
    }
}

module.exports = UserController
