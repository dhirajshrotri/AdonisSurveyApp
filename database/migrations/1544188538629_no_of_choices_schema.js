'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoOfChoicesSchema extends Schema {
  up () {
    this.create('no_of_choices', (table) => {
      table.increments('choiceId')
      table.timestamps()
      table.string('option')
      table.integer('question_Id').unsigned()
      table
        .foreign('question_Id')
        .references('questions.questionId')
        .onDelete('cascade')
    })
  }

  down () {
    this.drop('no_of_choices')
  }
}

module.exports = NoOfChoicesSchema
