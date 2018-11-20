'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
    static get primaryKey() {
        return 'answerId'
    }
}

module.exports = Answer
