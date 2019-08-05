'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 60).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('title', 254).notNullable()
      table.string('tel', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
