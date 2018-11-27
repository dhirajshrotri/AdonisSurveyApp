'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Question = use('App/Models/Question')
const Survey = use('App/Models/Survey')
/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new question.
   * GET questions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response  }) {
    // const {questionTitle, description} = request.post()

    // const question = await Question.create({questionTitle, description})

    // response.status(201).json({
    //   message: 'Created a new Question successfully',
    //   data: question
    // })
    // const question = new Question()

    // question.questionTitle = request.input('questionTitle')
    // question.description = request.input('questionDesc')
    // //question.surveyId = surveyId
    // console.log(params)
    //await question.save()
    // console.log(request.input('questionTitle'))
    // console.log(request.input('questionDesc'))
    const question = new Question()
    const survey = await Survey.find(params.surveyId)
    console.log(params.surveyId)
    const questionTitle = request.input('questionTitle')
    const description = request.input('description')

    question.questionTitle = questionTitle
    question.description = description

    await survey.question().save(question)

    console.log('Question Added Successfully!')
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // response.status(201).json({
    //   data: request.post()
    // })
    console.log(params)
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = QuestionController
