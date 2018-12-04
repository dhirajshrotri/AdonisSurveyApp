'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveyTokenSchema extends Schema {
  up () {
    this.create('survey_tokens', (table) => {
      table.increments('tokenId')
      table.timestamps()
      table.string('token')
      table.bigInteger('tokenExpires')

      table.integer('survey_Id').unsigned()
      table
        .foreign('survey_Id')
        .references('surveys.surveyId')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('survey_tokens')
  }
}

module.exports = SurveyTokenSchema
