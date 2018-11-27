'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments('questionId')
      table.timestamps()
      table.string('questionTitle')
      table.string('description')
      table.integer('survey_Id').unsigned()
      table
        .foreign('survey_Id')
        .references('surveys.surveyId')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
