'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Question = use('App/Models/Question')
const Survey = use('App/Models/Survey')
const AnswerType = use('App/Models/Answertype')
const User = use('App/Models/User')
const FroalaEditor = require('../node_modules/lib/froalaEditor.js')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (request, file, cb) => {
    cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
  }
})

const checkFiletype = (file, cb) => { 
  //allowed file types
  const fileTypes = /jpeg|jpg|png|gif/
  //check filetype
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  //check mime
  const mimetype = fileTypes.test(file.mimetype)

  if(extname && mimetype){
    return cb(null, true)
  }else {
    return cb('Error: Images only!')
  }
}

const upload = multer({
  storage: storage,
  limits: {filesize: 100000},
  fileFilter: function(request, file, cb){
    checkFiletype(file, cb);
  }
}).single('myImage');

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

  // async uploadImage({params:{id, surveyId}, request, response}){
  //   upload(request, response, (err)=> {
  //     if(err){
  //       res.render('index', {
  //         msg: err
  //       });
  //     } else {
  //       if(req.file == undefined){
  //         res.render('index', {
  //           msg: 'Error: No File Selected!'
  //         });
  //       } else {
  //         res.render('index', {
  //           msg: 'File Uploaded!',
  //           file: `uploads/${request.file.filename}`
  //         })
  //       }
  //     }
  //   }) 
    // const survey = await Survey.find(surveyId)
    // console.log("trying to upload image")

  //}

  
}

module.exports = QuestionController