'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NoOfChoice extends Model {
    static get primarykey(){
        return choiceId
    }

    answerType(){
        return this.belongsTo('App/Models/Answertype')
    }
}

module.exports = NoOfChoice
