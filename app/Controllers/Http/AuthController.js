'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class AuthController {

    * showRegisterPage(request, response){
        yield response.sendView('auth.register')
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
