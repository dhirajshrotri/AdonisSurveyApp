'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IsActiveSchema extends Schema {
  up () {
    this.create('is_actives', (table) => {
      table.increments('isActiveId')
      table.timestamps()
      table.string('token', 40).unique()
      table.boolean('is_active') 
      table.biginteger('token_expire')
      table.integer('user_id').unsigned()
      table.foreign('user_id')
           .references('users.id')
           .onDelete('cascade')
    })
  }

  down () {
    this.drop('is_actives')
  }
}

module.exports = IsActiveSchema
