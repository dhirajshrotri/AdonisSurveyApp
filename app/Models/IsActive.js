'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class IsActive extends Model {
    static get primaryKey() {
        return 'isActiveId'
    }

    static boot(){
        super.boot()
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
    
}

module.exports = IsActive
