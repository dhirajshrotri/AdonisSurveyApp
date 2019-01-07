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
    var answertype =await question.answerType().fetch()
    answertype = answertype.toJSON()
    //var choice = await NoOfChoice.query().where('answerType_Id', answertype.answerTypeId).fetch()
    var choice = await question.option().fetch()
    choice = choice.toJSON()
    //console.log(choice)
    // console.log(id)
    // console.log(surveyId)
    return view.render('addanswertype', {
        choices: choice,
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
    
    
  }

  /**
   * Create/save a new answertype.
   * POST answertypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params:{id, surveyId, questionId}, response}) {
    const answerChoice = request.input('choice')
    const question = await Question.find(questionId)
    var answertype = await Answertype.query().where('question_Id', questionId).fetch()
    answertype = answertype.toJSON()
    const choice = new NoOfChoice()
    choice.option = answerChoice
    //choice.answerType_Id = answertype[0].answerTypeId
    
    await question.option().save(choice)
    //await choice.save()
    return response.redirect('/users/'+id+'/surveys/'+surveyId+'/questions/'+questionId+'/addAnswerType')
    // return view.render('addanswerchoice', {
    //   answertype: answertype,
    //   answerChoices: parseInt(answerChoices), 
    //   question: question,
    //   id: id,
    //   surveyId: surveyId
    // })
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
  async edit ({ params:{id, surveyId, questionId, choiceId}, request, response, view }) {
   //var choice = await NoOfChoice.query().where('choiceId', choiceId).fetch()
   var question = await Question.find(questionId)
   var choice = question.option().fetch()
   //choice = choice.toJSON()
   return view.render('editchoice', {
     choice: choice,
     questionId: questionId,
     id: id,
     surveyId: surveyId
   })   
  }

  /**
   * Update answertype details.
   * PUT or PATCH answertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id, surveyId, questionId, choiceId}, request, response }) {
    //var choice = await NoOfChoice.find('choiceId')
    const question = await Question.find(questionId)
    const option = request.input('choice')
    await question.option().update({'option': option})
    //await NoOfChoice.query().where('choiceId', choiceId).update({'option': option})
    return response.redirect('/users/'+id+'/surveys/'+surveyId+'/questions/'+questionId+'/addAnswerType')
  }

  /**
   * Delete a answertype with id.
   * DELETE answertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params:{id, surveyId, questionId, choiceId}, request, response }) {
    await NoOfChoice
      .query()
      .where('choiceId', choiceId)
      .delete()
    return response.redirect('/users/'+id+'/surveys/'+surveyId+'/questions/'+questionId+'/addAnswerType')
  }
}

module.exports = AnswertypeController
