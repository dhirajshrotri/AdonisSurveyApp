'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.timestamps()
      table.text('answerText')
      table.integer('questionId').unsigned()
      table
        .foreign('questionId')
        .references('questions.id')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
