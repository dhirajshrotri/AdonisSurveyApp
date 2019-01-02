'use strict'

const User = use('App/Models/User')
const Validator = use('validator')

class AuthController {

    // * showRegisterPage(request, response){
    //    return view.render('auth/register')
    // }

    // * register(request, response){
    //     //validate from input
    // const validation = yield Validator.validateAll(request.all(), User.rules)
    //     //show error messages upon validation fail
    // if(validation.fails()){
    //     yield request
    //         .withAll()
    //         .andWith({ errors: validation.messages() })
    //         .flash()

    //     return response.redirect('back')
    // }
    //     //persist to database
    //     const user = yield User.create({
    //         email: request.input('email'),
    //         password: request.input('password')
    //     })

    //     yield request.auth.login(user)

    //     response.redirect('/')
    // }
    async redirect({ally}){
        await ally.driver('gmail').redirect()
    }

    async login({ally, response, auth}){
        const gUser = await ally.driver('google').getUser()

        const userDetails = {
            firstName: gUser.getName(),
            email: gUser.getEmail()
        }

        const whereClause = {
            email: gUser.getEmail()
        }
        const user = await User.findOrCreate(whereClause, userDetails)
        await auth.remember(true).login(user)
        return response.redirect('/')
    }

}

module.exports = AuthController
