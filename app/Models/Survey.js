'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
    static get primaryKey() {
        return 'surveyId'
    }

    admin(){
        return this.belongsTo('App/Model/Admin')
    }

    question(){
        return this.hasMany('App/Model/Question')
    }
}

module.exports = Survey
