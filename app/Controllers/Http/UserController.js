'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
    async login({request, response, auth, session}){
        // const email = request.input('email')
        // const password = request.input('password')
        // // console.log(email)
        // // console.log(password)
        // const login = await auth.attempt(email, password)
        // const loginMessage = {
        //     success: 'Logged in successfully!',
        //     error: 'Invalid Credentials' 
        // }
        // console.log(login)
        // if(login){
        //     const user = await auth.getUser()
        //     //await auth.login(user)
        //     //console.log('logging in user!')
        //     //return
        //     return reponse.redirect('/users/' + user.id )
        // }
        // await response.sendView('/login', {error: loginMessage.error})
        // //console.log('Invalid')
        const {email, password} = request.all()

        try{
            await auth.attempt(email, password)
            return response.redirect('/')
        }catch(error){
            session.flash({loginError: 'The credentials do not work.'})
            return response.redirect('/login');
        }
    }

    async profile({request, response, auth}){
        const user = auth.getUser()

        if(admin){
            response.ok(user)
            return
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

}

module.exports = UserController
