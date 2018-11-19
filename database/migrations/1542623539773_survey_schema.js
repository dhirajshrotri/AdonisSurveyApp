'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveySchema extends Schema {
  up () {
    this.create('surveys', (table) => {
      table.increments()
      table.timestamps()
      table.string('surveyName')
      table.text('surveyDesc')
      table.integer('adminId').unsigned()
      table  
        .foreign('adminId')
        .references('admins.id')
        .onDelete('cascade')
      
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveySchema
