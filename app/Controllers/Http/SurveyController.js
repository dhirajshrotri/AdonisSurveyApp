'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with surveys
 */
class SurveyController {
  /**
   * Show a list of all surveys.
   * GET surveys
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new survey.
   * GET surveys/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new survey.
   * POST surveys
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {surveyTitle, surveyDesc} = request.post()

    const survey = await Survey.create({surveyTitle, surveyDesc})

    response.status(201).json({
      message: 'Successfully created a new survey.'
      //data: admin 
    })
  }

  /**
   * Display a single survey.
   * GET surveys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ request, response, params: {id} }) {
    response.status(200).json({
      data: request.post().survey
    })
  }

  /**
   * Render a form to update an existing survey.
   * GET surveys/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update survey details.
   * PUT or PATCH surveys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response, params:{id} }) {
      const {surveyTitle, surveyDesc} = request.post()

      survey.surveyTitle = surveyTitle
      survey.surveyDesc = surveyDesc
      
      await survey.save()

      response.status(200).json({
        message: 'Survey updated!',
        id
      })
  }

  /**
   * Delete a survey with id.
   * DELETE surveys/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ request, response, params: {id} }) {
    const survey = request.post().survey

    await survey.delete()

    response.status(200).json({
      message: 'Successfully deleted this survey.',
      data: id
    })
  }
}

module.exports = SurveyController