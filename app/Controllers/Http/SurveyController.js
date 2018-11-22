'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Survey = use('App/Models/Survey')
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
    return view.render('makesurvey', {
      title: "Here's where you can create a new Survey!", 
      message: "Get started now!"
    })
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
  async store ({ request, response, params: {adminId} }) {
    const {surveyName, surveyDesc } = request.post()
    const survey = await Survey.create({surveyName, surveyDesc, adminId})

    response.status(201).json({
      message: 'Successfully created a new survey.',
      data: survey 
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
  async show ({ request, response, params: {surveyid} }) {
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
  async update ({ request, response, params:{surveyid} }) {
      const {surveyTitle, surveyDesc} = request.post()

      survey.surveyTitle = surveyTitle
      survey.surveyDesc = surveyDesc
      
      await survey.save()

      response.status(200).json({
        message: 'Survey updated!',
        surveyid
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
  async destroy ({ request, response, params: {surveyid} }) {
    const survey = request.post().survey

    await survey.delete()

    response.status(200).json({
      message: 'Successfully deleted this survey.',
      data: surveyid
    })
  }
}

module.exports = SurveyController