'use strict'

const User = use('App/Models/User')
const Validator = use('validator')

class AuthController {
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
