'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')


Factory.blueprint('App/Models/User',async (faker) => {
  return {
    firstName: faker.username(),
    lastName: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Survey', (faker) => {
    return {
        surveyName: faker.sentence(),
        surveyDesc: faker.paragraph()
    }
})

Factory.blueprint('App/Models/Question', (faker) => {
    return {
        questionTitle: faker.sentence(),
        description: faker.sentence()
    }
})

Factory.blueprint('App/Models/Answertype', (faker) => {
    return {
        answerType: faker.word()
    }
})

Factory.blueprint('App/Models/NoOfChoice', (faker)=>{
    return{
        option: faker.word()
    }
})

Factory.blueprint('App/Models/Answer', (faker)=>{
    return{
        answerText: faker.sentence()
    }
})
