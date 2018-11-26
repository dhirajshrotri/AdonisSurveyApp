'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    static get primaryKey (){
        return 'questionId'
    }

    survey(){
        return this.belongsTo('App/Model/Survey')
    }

    answer(){
        return this.hasMany('App/Model/Answer')
    }
}

module.exports = Question
