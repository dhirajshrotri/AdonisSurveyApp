'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Database = use('Database')

class UserController {
    async login({request, response, auth, session}){
      
        const {email, password, remember} = request.all()

        const user =  await User.query()
                                .where('email', email)
                                .first()
        //console.log(user)
        if(user){
            const passwordVerified = await Hash.verify(password, user.password)
            if(passwordVerified){
                await auth.remember(!!remember).login(user)
                return response.redirect('/users/'+user.id)
            }
        }
        session.flash({
            notification: {
              type: 'danger',
              message: `We couldn't verify your credentials. Make sure you've confirmed your email address.`
           }
        })

        return response.redirect('back')

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
        const rules = {
            firstName: 'required',
            lastName: 'required',
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            //console.log('Errors')
        }else{
            const user = new User()
            user.email = request.input('email')
            user.firstName = request.input('firstName')
            user.lastName = request.input('lastName')
            user.password = request.input('password')
            console.log('creating user!')
            await user.save()
            session.flash({ notification: 'User Registered!' })

            return response.redirect('/login')
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
}

module.exports = UserController
