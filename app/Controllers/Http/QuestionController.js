'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Question = use('App/Models/Question')
const Survey = use('App/Models/Survey')
const AnswerType = use('App/Models/Answertype')
const User = use('App/Models/User')
const multer = require('multer')
const multerupload = multer({ dest: './uploads/' });
const path = require('path')
var FroalaEditor = require('../../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');

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
  async store ({ params:{id, surveyId}, request, response, session }) {
    const {questionTitle, description, answer} = request.all()
    const answertype = new AnswerType()
   
    if(answer){
      const question = new Question()
      const survey = await Survey.find(surveyId)
      answertype.answerType = answer
      question.questionTitle = questionTitle
      question.description = description
      await survey.question().save(question)
      await question.answerType().save(answertype)
      //console.log('Question added!')
      if (answer === 'checkbox' || answer === 'radio') {
        response.redirect('/users/'+id+'/surveys/'+surveyId+'/questions/'+question.questionId+'/addAnswerType')  
      } else {
       response.redirect('/users/'+id+'/surveys/'+surveyId) 
      }
    }
    else{
      session.flash({
        type:'danger', 
        notification: `Please select an option for answer type from below.`, 
      })
      return response.redirect('/users/'+id+'/surveys/'+surveyId)
    }
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
  async edit ({ params:{id, surveyId, questionId }, view }) {
    const question = await Question.find(questionId)
    const tempQuestion = question.toJSON()
    var choice = await question.option().fetch()
    var answertype =await question.answerType().fetch()
    answertype = answertype.toJSON()
    return view.render('questionedit', {
      answertype: answertype,
      choice: choice.toJSON(),
      id: id,
      surveyId: surveyId,      
      question: tempQuestion
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
  async update ({ params:{id, surveyId, questionId}, request, response }) {
    const survey = await Survey.find(surveyId)
    const question = await Question.find(questionId)
    
    const questionTitle = request.input('questionTitle')
    const description = request.input('description')
    if(!questionTitle){
      questionTitle = question.questionTitle
    }
    if(!description){
      description = question.description
    }
    await survey.question().where('questionId', questionId).update({'questionTitle': questionTitle, 'description': description})
    response.redirect('/users/'+id+'/surveys/'+surveyId)
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params:{id, surveyId, questionId}, response }) {
    const survey = await Survey.find(surveyId)

    await survey.question().where('questionId', questionId).delete()
    response.redirect('/users/'+id+'/surveys/'+surveyId)
  }

  async uploadImage ({params:{id, surveyId}, response, request}){
    response.setHeader('content-type', 'text/html');
    FroalaEditor.Image.upload(request, '/uploads/', function(err, data) {
      console.log(data)
      // Return data.
      if (err) {
        //console.log(err)
        //response.setHeader('content-type', 'text');
        return response.send(JSON.stringify(err));
      }
      //console.log(typeof data)
      
      response.send(data);
    });
    // multerupload.any()
    // upload.fileupload
  }

  
}

module.exports = QuestionController