'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Survey = use('App/Models/Survey')
const Question = use('App/Models/Question')
const AnswerType = use('App/Models/Answertype')
const NoOfChoices = use('App/Models/NoOfChoice')
const Answer = use('App/Models/Answer')
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
    var answers = await question.answer().fetch()
    let labels = []
    let text = []
    answers = answers.toJSON()
    answertype = answertype.toJSON()
    if(answertype.answerType === 'text'){
      for (let index = 0; index < answers.length; index++) {
        console.log(answers[index].answerText)
      }
    }else{
      let set = new Set()
    for (let index = 0; index < answers.length; index++) {
      const temp = answers[index].answerText
      set.add(temp)
      text.push(temp)
    }
    text.sort()
    var counts = []
    for (let index = 0; index < text.length; index++) {
      counts[text[index]] = 1 + (counts[text[index]] || 0)
    }
    let val = []
    for (const key in counts) {
      const temp = counts[key]
      val.push(temp)
    }
    labels = Array.from(set)
    console.log(labels)
    return view.render('result', { 
      labels: labels,
      val: val, 
      id: id,
      surveyId:surveyId
    })
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
  async store ({ request, params:{surveyId}, view }) {
    const ans = request.all()
    console.log(ans)
    var surveys = await Survey.find(surveyId)
    var questions = await surveys.question().fetch()
    questions = questions.toJSON()
    let answertypes = []
    let options = []
    for (const key in questions) {
      //console.log(questions[key])
      const temp = await AnswerType.query().where('question_Id', questions[key].questionId).fetch()
      answertypes.push(temp.toJSON())
    }
    //console.log(answertypes)
    //console.log(ans)
    for (const key in answertypes) {
      if(answertypes[key][0].answerType === "checkbox"){
        for (let index = 0; index < ans[answertypes[key][0].answerType].length; index++) {
          const answer = new Answer()
          answer.answerText = ans[answertypes[key][0].answerType][index]
          answer.question_Id = answertypes[key][0].question_Id
          await answer.save()
        }
  
      }else{
        const answer = new Answer()
        answer.answerText = ans[answertypes[key][0].answerType]
        answer.question_Id = questions[key].questionId
        await answer.save()
      }
    }
    return view.render('thankyou')
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
