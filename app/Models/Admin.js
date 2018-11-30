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
          this.addHook('beforeCreate', 'Admin.validate')
      }
//, adminId, surveyId
      survey(){
          return this.hasMany('App/Models/Survey')
      }
}

module.exports = Admin