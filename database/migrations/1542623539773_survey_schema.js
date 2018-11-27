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
      table.integer('admin_id').unsigned()
      table  
        .foreign('admin_id')
        .references('admins.adminId')
        .onDelete('cascade')
      
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveySchema
