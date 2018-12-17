'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NoOfChoice extends Model {
    static get primarykey(){
        return choiceId
    }

    question(){
        return this.belongsTo('App/Models/Question')
    }
}

module.exports = NoOfChoice
