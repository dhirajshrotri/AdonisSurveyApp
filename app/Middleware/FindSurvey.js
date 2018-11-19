'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survey = use('App/Models/Survey')

class FindSurvey {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, param: {id} }, next) {
    // call next to advance the request
    const survey = await Survey.find(id)
    
    if (!survey) {
      return response.status(404).json({
        message: 'No such survey found!', 
        id
      })
    }

    request.body.survey = survey
    await next()
  }
}

module.exports = FindSurvey
