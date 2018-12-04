'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveySchema extends Schema {
  up () {
    this.create('surveys', (table) => {
      table.increments('surveyId')
      table.timestamps()
      table.string('surveyName')
      table.text('surveyDesc')
      table.integer('user_id').unsigned()
      table  
        .foreign('user_id')
        .references('users.id')
        .onDelete('cascade')
      
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveySchema
