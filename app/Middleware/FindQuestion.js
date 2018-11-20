'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Question = use('App/Models/Question')
class FindQuestion {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {questionId} }, next) {
    // call next to advance the request
    const question = await Question.find(questionId)

    // console.log(question)
    if(!question){
      return response.status(404).json({
        message: 'No such question found.',
        questionId
      })
    }

    await next()
  }
}

module.exports = FindQuestion
