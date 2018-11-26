'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Admin extends Model {
    static get primaryKey () {
        return 'adminId'
      }

      static boot(){
          super.boot()
          this.addHook('beforeCreate', 'Admin.encryptPassword')
      }

      survey(){
          return this.hasMany('App/Model/Survey')
      }
}

module.exports = Admin
