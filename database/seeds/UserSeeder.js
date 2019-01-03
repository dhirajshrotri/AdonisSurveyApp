'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    for (let index = 0; index < 100; index++) {
      const user = await Factory.model('App/Models/User').create()
      const survey = await Factory.model('App/Models/Survey').make()
      const question = await Factory.model('App/Models/Question').make()
      const answertype = await Factory.model('App/Models/Answertype').make()
      const option = await Factory.model('App/Models/NoOfChoice').make()
      const answer = await Factory.model('App/Models/Answer').make()
      await user.survey().save(survey)
      await survey.question().save(question)
      await question.answerType().save(answertype)
      await question.option().save(option)
      await question.answer().save(answer)
    }
  }
}

module.exports = UserSeeder
