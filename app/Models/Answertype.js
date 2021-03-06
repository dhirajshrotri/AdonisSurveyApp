'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answertype extends Model {
    static get primarykey(){
        return answerTypeId
    }

    question(){
        return this.belongsTo('App/Models/Question')
    }
}

module.exports = Answertype
