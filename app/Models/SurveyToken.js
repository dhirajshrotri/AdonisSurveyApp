'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SurveyToken extends Model {
    static get primaryKey () {
        return 'tokenId'
    }

    survey(){
        return this.belongsTo('App/Models/Survey')
    }
}

module.exports = SurveyToken
