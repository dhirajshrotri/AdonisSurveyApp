'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments('answerId')
      table.timestamps()
      table.text('answerText')
      table.integer('userToken')
      table.integer('question_Id').unsigned()
      table
        .foreign('question_Id')
        .references('questions.questionId')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema
