'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    static get primaryKey (){
        return 'questionId'
    }

    survey(){
        return this.belongsTo('App/Models/Survey')
    }

    answer(){
        return this.hasMany('App/Models/Answer')
    }

    answerType(){
        return this.hasOne('App/Models/Answertype')
    }
}

module.exports = Question
