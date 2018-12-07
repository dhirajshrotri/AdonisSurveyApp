'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoOfChoicesSchema extends Schema {
  up () {
    this.create('no_of_choices', (table) => {
      table.increments('choiceId')
      table.timestamps()
      table.integer('choices')
      table.integer('question_id').unsigned()
      table.foreign('question_id')
           .references('questions.questionId')
           .onDelete('cascade')
    })
  }

  down () {
    this.drop('no_of_choices')
  }
}

module.exports = NoOfChoicesSchema
