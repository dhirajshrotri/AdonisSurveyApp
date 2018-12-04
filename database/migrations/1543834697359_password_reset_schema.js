'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  up () {
    this.create('password_resets', (table) => {
      table.increments('resetId')
      table.timestamps()
      table.integer('userId')
      table.string('email', 254).notNullable().unique()
      table.string('token', 255)     
    })
  }

  down () {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetSchema
