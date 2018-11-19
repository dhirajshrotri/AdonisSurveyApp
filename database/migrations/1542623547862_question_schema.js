'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.timestamps()
      table.string('questionTitle')
      table.string('description')
      table.integer('surveyId').unsigned()
      table
        .foreign('surveyId')
        .references('surveys.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
