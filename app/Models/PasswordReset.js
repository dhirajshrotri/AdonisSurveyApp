'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PasswordReset extends Model {
    static get primaryKey() {
        return 'resetId'
    }

    User(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = PasswordReset
