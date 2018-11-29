'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswertypeSchema extends Schema {
  up () {
    this.create('answertypes', (table) => {
      table.increments('answerTypeId')
      table.timestamps()
      table.string('answerType')
      table.integer('question_Id').unsigned()
      table
        .foreign('question_Id')
        .references('questions.questionId')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('answertypes')
  }
}

module.exports = AnswertypeSchema
