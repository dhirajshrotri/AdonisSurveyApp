'use strict'

const User = use('App/Models/User')
const Validator = use('validator')

class AuthController {

    * showRegisterPage(request, response){
       return view.render('auth/register')
    }

    * register(request, response){
        //validate from input
    const validation = yield Validator.validateAll(request.all(), User.rules)
        //show error messages upon validation fail
    if(validation.fails()){
        yield request
            .withAll()
            .andWith({ errors: validation.messages() })
            .flash()

        return response.redirect('back')
    }
        //persist to database
        const user = yield User.create({
            email: request.input('email'),
            password: request.input('password')
        })

        yield request.auth.login(user)

        response.redirect('/')
    }
}

module.exports = AuthController
