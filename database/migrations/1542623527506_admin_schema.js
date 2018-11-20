'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments('adminId')
      table.timestamps()
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.string('password')
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
