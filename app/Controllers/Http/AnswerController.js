'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Survey = use('App/Models/Survey')
const Question = use('App/Models/Question')
/**
 * Resourceful controller for interacting with answers
 */
class AnswerController {
  /**
   * Show a list of all answers.
   * GET answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params: {id, surveyId}, response, view }) {
    const survey = await Survey.find(surveyId)
    const question = await survey.question().fetch()
    
    return view.render('answershow', {
      survey: survey.toJSON(),
      question: question.toJSON(),
      id: id
    })
  }

  /**
   * Render a form to be used for creating a new answer.
   * GET answers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async count ({params:{id, surveyId, questionId}, request, response, view }) {
    const question = await Question.find(questionId)
    var answertype = await question.answerType().fetch()
    answertype = answertype.toJSON()
    //console.log(answertype.answerType)
    if(answertype.answerType === 'radio' || answertype.answerType === 'checkbox'){
      //TODO: calculate percentage
    }
    else{
      console.log('text')
    }
  }

  /**
   * Create/save a new answer.
   * POST answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single answer.
   * GET answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id, surveyId, questionId}, request, response, view }) {
    const question = await Question.find(questionId)
    const answertype = await question.answerType().fetch()
    //const answer = await question.answer().fetch()
    if (answertype === "checkbox" || answertype === "radio") {
      console.log('checkbox')
    }
    else{
      console.log('text')
    }
  }

  /**
   * Render a form to update an existing answer.
   * GET answers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update answer details.
   * PUT or PATCH answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a answer with id.
   * DELETE answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AnswerController
