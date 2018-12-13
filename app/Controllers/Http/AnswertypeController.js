'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Question = use('App/Models/Question')
const Answertype = use('App/Models/Answertype')
const NoOfChoice = use('App/Models/NoOfChoice')
/**
 * Resourceful controller for interacting with answertypes
 */
class AnswertypeController {
  /**
   * Show a list of all answertypes.
   * GET answertypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ session, response, view, params:{id, surveyId, questionId} }) {
    const question = await Question.find(questionId)
    const answertype =await question.answerType().fetch()
    // console.log(answertype)
    console.log(id)
    console.log(surveyId)
    return view.render('addanswertype', {
        answertype: answertype.answerType,
        question: question,
        id: id,
        surveyId: surveyId
      })
  }

  /**
   * Render a form to be used for creating a new answertype.
   * GET answertypes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, params:{surveyId, questionId} }) {
    console.log('create route hit!')
    
  }

  /**
   * Create/save a new answertype.
   * POST answertypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, view, params:{id, surveyId, questionId}}) {
  //  console.log('store route hit!')
    const answerChoices = request.input('answerChoices')
    const question = await Question.find(questionId)
    const answertype = await question.answerType().fetch
    return view.render('addanswerchoice', {
      answertype: answertype,
      answerChoices: parseInt(answerChoices), 
      question: question,
      id: id,
      surveyId: surveyId
    })
  }

  /**
   * Display a single answertype.
   * GET answertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing answertype.
   * GET answertypes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update answertype details.
   * PUT or PATCH answertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a answertype with id.
   * DELETE answertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AnswertypeController
