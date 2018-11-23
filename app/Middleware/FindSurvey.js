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
  async handle ({ request, response, params: {surveyId}}, next) {
    // call next to advance the request
    const survey = await Survey.find(surveyId)
    
    if (!survey) {
      return response.status(404).json({
        message: 'No such survey found!', 
        surveyId
      })
    }

    request.body = survey
    await next()
    //console.log('hit the find survey middleware!')
  }
}

module.exports = FindSurvey
