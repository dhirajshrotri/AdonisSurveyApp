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
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request }) {
    
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

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params:{adminId, surveyId, questionId }, view }) {
    const question = await Question.find(questionId)
    const tempQuestion = question.toJSON()
    //console.log(tempQuestion)
    return view.render('questionedit', {
      adminId: adminId,
      surveyId: surveyId,      
      question: question
    })
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{adminId, surveyId, questionId}, request, response }) {
    const survey = await Survey.find(surveyId)
    const question = await Question.find(questionId)
    
    const questionTitle = request.input('questionTitle')
    const description = request.input('description')
    //console.log(description)
    if(!questionTitle){
      questionTitle = question.questionTitle
    }
    if(!description){
      description = question.description
      //console.log('null detected')
    }
    await survey.question().where('questionId', questionId).update({'questionTitle': questionTitle, 'description': description})

    response.redirect('/admins/'+adminId+'/surveys/'+surveyId)
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params:{adminId, surveyId, questionId}, response }) {
    const survey = await Survey.find(surveyId)

    await survey.question().where('questionId', questionId).delete()
    response.redirect('/admins/'+adminId+'/surveys/'+surveyId)
  }
}

module.exports = QuestionController