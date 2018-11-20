'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Admin extends Model {
    static get primaryKey () {
        return 'adminId'
      }
}

module.exports = Admin
