'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
    static get primaryKey() {
        return 'surveyId'
    }

    user(){
        return this.belongsTo('App/Models/User')
    }
//, surveyId, questionId
    question(){
        return this.hasMany('App/Models/Question')
    }
    surveyToken(){
        return this.hasMany('App/Models/SurveyToken')
    }
}

module.exports = Survey
