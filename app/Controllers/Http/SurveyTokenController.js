'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const surveyToken = use('App/Models/SurveyToken')
const Survey = use('App/Models/Survey')
const Mail = use('Mail')
const randomString = require('random-string')
/**
 * Resourceful controller for interacting with surveytokens
 */
class SurveyTokenController {
  async sendMail({view, auth, params:{id, surveyId}}){
        const user = await auth.getUser()
        const survey = await user.survey().where('surveyId', surveyId).fetch()
        return view.render('sendmail', {
            user:user,
            surveyId: surveyId
        })
  }

  async sendLink({auth, request, response, params:{id, surveyId}}){
    const user = await auth.getUser()
    const mail = request.input('emails').split(",")
    const token = randomString({length:40})
    const tokenExpires = Date.now()+86400
    const survey = await Survey.find(surveyId)
    const surveyLink = new surveyToken()
    surveyLink.token = token
    surveyLink.tokenExpires = tokenExpires
    await survey.surveyToken().save(surveyLink)

    await Mail.send('emails.surveylink', survey.toJSON(), token, (message) => {
     mail.forEach(element => {
      message
      .to(element)
      .from(user.email)
      .subject('Survey Link')
     });
      
    } )
  }
}

module.exports = SurveyTokenController
