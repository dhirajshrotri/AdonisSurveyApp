'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NoOfChoice extends Model {
    static get primarykey(){
        return no_of_choices
    }

    question(){
        return this.belongsTo('App/Models/Question')
    }
}

module.exports = NoOfChoice
