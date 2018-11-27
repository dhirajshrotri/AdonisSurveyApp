'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
    static get primaryKey() {
        return 'surveyId'
    }

    admin(){
        return this.belongsTo('App/Models/Admin')
    }
//, surveyId, questionId
    question(){
        return this.hasMany('App/Models/Question')
    }
}

module.exports = Survey
